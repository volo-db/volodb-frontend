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
              label="Dokument"
              type="file"
              id="document"
              :required="true"
              v-model="files"
              :hasError="validationErr.document"
              @update:modelValue="handleFileChange"
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
      files: [],
      document: null,
      validationErr: {
        document: false
      },
      formValid: false,
      errorMessage: false
    }
  },
  methods: {
    validate() {
      this.formValid = false
      this.validationErr.document = false

      if (!this.document) this.validationErr.document = true

      if (!this.validationErr.document) {
        this.formValid = true
      }
    },
    onSubmit() {
      console.log(this.document)
      this.errorMessage = false

      this.validate()
      if (this.formValid) {
        console.log('valid')
      }
    },
    handleFileChange(files) {
      if (files.length > 0) {
        this.document = files[0] // Get the first file
      } else {
        this.document = null
      }
    }
  }
}
</script>
