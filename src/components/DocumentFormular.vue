<template>
  <section class="w-[70vw] max-w-[850px] min-w-[400px]" @keydown.esc="$emit('close')">
    <header class="flex justify-center p-5 border-solid border-b border-vologray-200">
      <h2 class="text-[20px] text-bold font-medium">
        Neues Dokument für {{ volunteerStore.selectedVolunteer.person.firstname }}
      </h2>
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
            Lade ein neues Dokument für
            {{ volunteerStore.selectedVolunteer.person.firstname }} hoch.
          </p>
        </div>
        <!-- right column -->
        <div class="flex-1">
          <form class="flex flex-col gap-2" id="new-document" @submit.prevent="onSubmit" novalidate>
            <FormularInput
              name="document"
              label="Dokument"
              type="file"
              id="document"
              :required="true"
              v-model="file"
              :hasError="validationErr.file"
            />
          </form>
        </div>
      </div>
      <div
        v-if="volunteerStore.fetching"
        class="p-4 flex flex-row gap-2 justify-center items-center text-md"
      >
        <IconSpinner />speichere Dokument...
      </div>
    </main>
    <footer class="flex justify-between p-6 border-solid border-t border-vologray-200">
      <ButtonStandard @click.prevent="$emit('cancel')" :gray="true">Abbrechen</ButtonStandard>
      <ButtonStandard type="submit" form="new-document">Dokument hinzufügen</ButtonStandard>
    </footer>
  </section>
</template>

<script>
import ButtonStandard from './ButtonStandard.vue'
import { useVolunteerStore } from '@/stores/VolunteerStore'
import FormularInput from './FormularInput.vue'
import IconSpinner from './IconSpinner.vue'
export default {
  components: { ButtonStandard, IconSpinner, FormularInput },
  setup() {
    const volunteerStore = useVolunteerStore()

    return {
      volunteerStore
    }
  },
  data() {
    return {
      file: null,
      validationErr: {
        file: false
      },
      formValid: false,
      errorMessage: false
    }
  },
  methods: {
    validate() {
      this.formValid = false
      this.validationErr.file = false
      // Check if `file` is null
      if (!this.file) this.validationErr.file = true

      if (!this.validationErr.file) {
        this.formValid = true
      }
    },
    async onSubmit() {
      console.log(this.file)
      this.errorMessage = false

      this.validate()
      if (this.formValid) {
        console.log('valid')

        try {
          const formData = new FormData()
          formData.append('document', this.file) // Append file to FormData
          await this.volunteerStore.setDocument(formData, this.$route.params.volunteerId)
        } catch (error) {
          this.errorMessage = true
          console.error('Error uploading file:', error)
        }
      }
    }
  }
}
</script>
