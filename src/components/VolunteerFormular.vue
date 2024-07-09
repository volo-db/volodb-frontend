<template>
  <section class="w-[70vw] max-w-[850px] min-w-[400px]" @keydown.esc="$emit('cancel')">
    <header class="flex justify-center p-5 border-solid border-b border-vologray-200">
      <h2 class="text-[20px] text-bold font-medium">Neue:r Freiwillige:r</h2>
    </header>
    <main class="p-8">
      <p
        v-if="errorMessage"
        class="flex justify-center text-sm font-light rounded border border-1 mb-4 p-3 bg-red-100 border-red-500 text-red-500"
      >
        🤷‍♀️ Upsi! Da ist wohl was schief gelaufen... Versuchs bitte nochmal.
      </p>
      <div v-if="!volunteerStore.fetching" class="flex justify-center">
        <!-- left column -->
        <div class="flex-1">
          <p class="text-[13px] text-vologray-400 pe-20">
            Lege hier im ersten Schritt, die freiwillige Person mit ein paar grundlegenden Daten an.
            Alle weiteren Details kannst du im nächsten Schritt ergänzen.
          </p>
        </div>
        <!-- right column -->
        <div class="flex-1">
          <form
            class="flex flex-col gap-2"
            id="new-volunteer"
            @submit.prevent="onSubmit"
            novalidate
          >
            <FormularInput
              label="Name"
              id="lastname"
              :required="true"
              :hasError="validationErr.lastname"
              v-model="formData.lastname"
              ref="lastname"
            />
            <FormularInput
              label="Vorname"
              id="firstname"
              :required="true"
              :hasError="validationErr.firstname"
              v-model="formData.firstname"
            />
            <FormularSelectBox
              :list="['--bitte auswählen--', 'weiblich', 'männlich', 'divers', 'keine Angabe']"
              label="Gender"
              id="gender"
              :required="true"
              :hasError="validationErr.gender"
              v-model="formData.gender"
            />
            <FormularInput
              label="E-Mail"
              id="email"
              :hasError="validationErr.email"
              v-model="formData.email"
            />
            <FormularInput
              label="Mobil"
              id="mobile"
              :hasError="validationErr.mobile"
              v-model="formData.mobile"
            />
          </form>
        </div>
      </div>
      <div
        v-if="volunteerStore.fetching"
        class="p-4 flex flex-row gap-2 justify-center items-center text-md"
      >
        <IconSpinner />speichere daten...
      </div>
    </main>
    <footer class="flex justify-between p-6 border-solid border-t border-vologray-200">
      <ButtonStandard @click.prevent="$emit('cancel')" :gray="true">Abbrechen</ButtonStandard>
      <ButtonStandard type="submit" form="new-volunteer">Freiwillige:n anlegen</ButtonStandard>
    </footer>
  </section>
</template>
<script>
import ButtonStandard from './ButtonStandard.vue'
import { useVolunteerStore } from '@/stores/VolunteerStore'
import { useContactStore } from '@/stores/ContactStore'
import { confetti } from '@/utils/confetti.js'
import { isValidEmail } from '@/utils/validations'
import { parsePhoneNumber, isPossiblePhoneNumber } from 'libphonenumber-js'
import FormularInput from './FormularInput.vue'
import FormularSelectBox from './FormularSelectBox.vue'
import IconSpinner from './IconSpinner.vue'

export default {
  components: { ButtonStandard, IconSpinner, FormularInput, FormularSelectBox },
  setup() {
    const volunteerStore = useVolunteerStore()
    const contactStore = useContactStore()

    return {
      volunteerStore,
      contactStore
    }
  },
  data() {
    return {
      validationErr: {
        lastname: false,
        firstname: false,
        gender: false,
        email: false,
        mobile: false
      },
      formData: {
        lastname: '',
        firstname: '',
        gender: '--bitte auswählen--',
        email: '',
        mobile: ''
      },
      formValid: false,
      errorMessage: false
    }
  },
  methods: {
    validate() {
      // clear the table ;-)
      this.formValid = false
      this.validationErr.lastname = false
      this.validationErr.firstname = false
      this.validationErr.gender = false
      this.validationErr.email = false
      this.validationErr.mobile = false

      // Validate fields:
      // Lastname
      if (!this.formData.lastname) this.validationErr.lastname = true

      // Firstname
      if (!this.formData.firstname) this.validationErr.firstname = true

      // Gender
      if (!this.formData.gender) this.validationErr.gender = true

      // Email
      if (this.formData.email && !isValidEmail(this.formData.email)) this.validationErr.email = true

      // Mobile
      if (this.formData.mobile && !isPossiblePhoneNumber(this.formData.mobile, 'DE'))
        this.validationErr.mobile = true

      // If theres no error -> form is valid
      if (
        !this.validationErr.lastname &&
        !this.validationErr.firstname &&
        !this.validationErr.gender &&
        !this.validationErr.email &&
        !this.validationErr.mobile
      )
        this.formValid = true
    },
    async onSubmit() {
      this.errorMessage = false

      this.validate()
      if (this.formValid) {
        let backendGender

        switch (this.formData.gender) {
          case 'männlich':
            backendGender = 'male'
            break
          case 'weiblich':
            backendGender = 'female'
            break
          case 'divers':
            backendGender = 'diverse'
            break

          default:
            backendGender = 'not specified'
            break
        }

        let volunteer = {
          organisationalId: 'null',
          person: {
            lastname: this.formData.lastname,
            firstname: this.formData.firstname,
            gender: backendGender
          },
          status: 'BEWORBEN'
        }

        try {
          await this.volunteerStore.setVolunteer(volunteer)
          const voloId = this.volunteerStore.selectedVolunteer.id

          const mobile = {
            type: 'mobile',
            value: parsePhoneNumber(this.formData.mobile, 'DE').number
          }

          const email = {
            type: 'email',
            value: this.formData.email.trim()
          }

          await Promise.all([
            this.formData.mobile.trim() ? this.contactStore.setContact(voloId, mobile) : null,
            this.formData.email.trim() ? this.contactStore.setContact(voloId, email) : null
          ])
        } catch (error) {
          console.error(error)

          // Showing error message just for 5 seconds
          this.errorMessage = true
          setTimeout(() => {
            this.errorMessage = false
          }, 5000)
          return
        }

        confetti()

        this.$emit('saved', this.volunteerStore.selectedVolunteer.id)
      }
    }
  },
  mounted() {
    this.$refs.lastname.focus()
  }
}
</script>
