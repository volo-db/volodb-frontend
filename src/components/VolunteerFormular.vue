<template>
  <section class="w-[70vw] max-w-[850px] min-w-[400px]" @keydown.esc="$emit('close')">
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
            <div class="flex flex-col gap-1">
              <label
                class="text-vologray-500 font-normal"
                :class="{ 'error-label': validationErr.lastname }"
                for="name"
                >Name*</label
              >
              <input
                class="p-2 border border-vologray-500 rounded-md"
                :class="{ 'error-animation': validationErr.lastname }"
                type="text"
                id="name"
                required
                v-model="formData.lastname"
                ref="lastname"
              />
            </div>
            <div class="flex flex-col gap-1">
              <label
                class="text-vologray-500 font-normal"
                :class="{ 'error-label': validationErr.firstname }"
                for="firstname"
                >Vorname*</label
              >
              <input
                class="p-2 border border-vologray-500 rounded-md"
                :class="{ 'error-animation': validationErr.firstname }"
                type="text"
                id="firstname"
                required
                v-model="formData.firstname"
              />
            </div>
            <div class="flex flex-col gap-1">
              <label
                class="text-vologray-500 font-normal"
                :class="{ 'error-label': validationErr.gender }"
                for="gender"
                >Geschlecht*</label
              >
              <select
                class="p-2 border border-vologray-500 rounded-md"
                :class="{ 'error-animation': validationErr.gender }"
                id="gender"
                required
                v-model="formData.gender"
              >
                <option value="">--bitte auswählen--</option>
                <option value="female">weiblich</option>
                <option value="male">männlich</option>
                <option value="divers">divers</option>
                <option value="not-selected">keine Angaben</option>
              </select>
            </div>
            <div class="flex flex-col gap-1">
              <label
                class="text-vologray-500 font-normal"
                for="email"
                :class="{ 'error-label': validationErr.email }"
                >E-Mail</label
              >
              <input
                class="p-2 border border-vologray-500 rounded-md"
                :class="{ 'error-animation': validationErr.email }"
                type="email"
                id="email"
                v-model="formData.email"
              />
            </div>
            <div class="flex flex-col gap-1">
              <label
                class="text-vologray-500 font-normal"
                :class="{ 'error-label': validationErr.mobile }"
                for="mobile"
                >Mobil</label
              >
              <input
                class="p-2 border border-vologray-500 rounded-md"
                :class="{ 'error-animation': validationErr.mobile }"
                type="tel"
                id="mobile"
                v-model="formData.mobile"
              />
            </div>
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
      <ButtonStandard @click.prevent="$emit('close')">Abbrechen</ButtonStandard>
      <ButtonStandard type="submit" form="new-volunteer">Freiwillige:n anlegen</ButtonStandard>
    </footer>
  </section>
</template>
<script>
import ButtonStandard from './ButtonStandard.vue'
import { useVolunteerStore } from '@/stores/VolunteerStore'
import { isValidEmail, isValidPhoneNumber } from '@/utils/validations'
import IconSpinner from './IconSpinner.vue'

export default {
  components: { ButtonStandard, IconSpinner },
  setup() {
    const volunteerStore = useVolunteerStore()

    return {
      volunteerStore
    }
  },
  data() {
    return {
      validationErr: {
        lastname: false,
        firsname: false,
        gender: false,
        email: false,
        mobile: false
      },
      formData: {
        lastname: '',
        firstname: '',
        gender: '',
        email: '',
        mobile: ''
      },
      formValid: false,
      errorMessage: false,
      successMessage: false
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
      this.formData.mobile = this.formData.mobile.split(' ').join('')
      if (this.formData.mobile && !isValidPhoneNumber(this.formData.mobile))
        this.validationErr.mobile = true

      // If theres no error -> form is valid
      if (
        !this.validationErr.lastname &&
        !this.validationErr.firsname &&
        !this.validationErr.gender &&
        !this.validationErr.email &&
        !this.validationErr.mobile
      )
        this.formValid = true
    },
    async onSubmit() {
      this.errorMessage = false
      this.successMessage = false

      this.validate()
      if (this.formValid) {
        let volunteer = {
          organisationalId: 'null',
          person: {
            lastname: this.formData.lastname,
            firstname: this.formData.firstname,
            gender: this.formData.gender
          },
          status: 'BEWORBEN'
        }

        try {
          await this.volunteerStore.saveVolunteer(volunteer)
        } catch (error) {
          console.error(error)

          // Showing error message just for 5 seconds
          this.errorMessage = true
          setTimeout(() => {
            this.errorMessage = false
          }, 5000)

          return
        }
        this.$emit('close', this.volunteerStore.selectedVolunteer.id)
      }
    }
  },
  mounted() {
    this.$refs.lastname.focus()
  }
}
</script>
<style></style>
