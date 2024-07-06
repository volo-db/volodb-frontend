<template>
  <section class="w-[70vw] max-w-[850px] min-w-[400px]" @keydown.esc="$emit('cancel')">
    <header class="flex justify-center p-5 border-solid border-b border-vologray-200">
      <h2 class="text-[20px] text-bold font-medium">Neuen Namen anlegen</h2>
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
          <p class="text-[13px] text-vologray-400 pe-20">Lege hier einen neuen Namen an.</p>
        </div>
        <!-- right column -->
        <div class="flex-1">
          <form class="flex flex-col gap-2" id="new-name" @submit.prevent="onSubmit" novalidate>
            <FormularInput
              label="Nachname"
              id="lastname"
              :hasError="validationErr.lastname"
              v-model="formData.lastname"
              :required="true"
              ref="lastname"
            />
            <FormularInput
              label="Vorname"
              id="firstname"
              :hasError="validationErr.firstname"
              v-model="formData.firstname"
              :required="true"
            />
          </form>
        </div>
      </div>
      <div v-if="volunteerStore.fetching" class="flex gap-2 justify-center items-center text-md">
        <IconSpinner />
        <p>speichere Namen ...</p>
      </div>
    </main>
    <footer class="flex justify-between p-6 border-solid border-t border-vologray-200">
      <ButtonStandard @click.prevent="$emit('cancel')" :gray="true">Abbrechen</ButtonStandard>
      <ButtonStandard type="submit" form="new-name">Namen anlegen</ButtonStandard>
    </footer>
  </section>
</template>

<script>
import FormularInput from './FormularInput.vue'
import ButtonStandard from './ButtonStandard.vue'
import { useVolunteerStore } from '@/stores/VolunteerStore'
import IconSpinner from './IconSpinner.vue'
export default {
  setup() {
    const volunteerStore = useVolunteerStore()

    return {
      volunteerStore
    }
  },
  components: { FormularInput, IconSpinner, ButtonStandard },
  props: { lastnameCopy: String, firstnameCopy: String },
  data() {
    return {
      validationErr: {
        lastname: false,
        firstname: false
      },
      formData: {
        lastname: this.lastnameCopy,
        firstname: this.firstnameCopy
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

      // Validate fields:
      // Lastname
      if (!this.formData.lastname) this.validationErr.lastname = true

      // Firstname
      if (!this.formData.firstname) this.validationErr.firstname = true

      // If theres no error -> form is valid
      if (!this.validationErr.lastname && !this.validationErr.firstname) this.formValid = true
    },
    async onSubmit() {
      this.errorMessage = false

      this.validate()
      if (this.formValid) {
        let volunteer = {
          person: {
            lastname: this.formData.lastname,
            firstname: this.formData.firstname
          }
        }
        let id = this.$route.params.volunteerId

        try {
          await this.volunteerStore.editVolunteer(volunteer, id)
        } catch (error) {
          console.error(error)

          // Showing error message just for 5 seconds
          this.errorMessage = true
          setTimeout(() => {
            this.errorMessage = false
          }, 5000)
          return
        }
        this.$emit('saved')
      }
    }
  },
  mounted() {
    this.$refs.lastname.focus()
  }
}
</script>
