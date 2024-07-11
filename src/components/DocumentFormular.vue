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
      <div v-if="!volunteerStore.fetchingDocuments" class="flex justify-center">
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
              name="name"
              label="Name"
              type="text"
              id="name"
              :required="true"
              :hasError="validationErr.name"
              v-model="formData.name"
            />
            <FormularSelectBox
              :titles="volunteerStore.getTitlesList"
              :list="volunteerStore.getTypeList"
              label="Typ"
              id="type"
              :required="true"
              :hasError="validationErr.type"
              v-model="formData.type"
            />
            <FormularInput
              name="document"
              label="Dokument"
              type="file"
              id="document"
              :required="true"
              v-model="formData.file"
              :hasError="validationErr.file"
            />
          </form>
        </div>
      </div>
      <div
        v-if="volunteerStore.fetchingDocuments"
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
import FormularSelectBox from './FormularSelectBox.vue'
import IconSpinner from './IconSpinner.vue'
export default {
  components: { ButtonStandard, IconSpinner, FormularInput, FormularSelectBox },
  setup() {
    const volunteerStore = useVolunteerStore()

    return {
      volunteerStore
    }
  },
  data() {
    return {
      documentTypes: null,
      list: [],
      titles: [],
      formData: {
        file: null,
        name: '',
        type: '',
        id: null
      },
      validationErr: {
        file: false,
        name: false,
        type: false
      },
      formValid: false,
      errorMessage: false
    }
  },
  methods: {
    validate() {
      this.formValid = false
      this.validationErr.file = false
      this.validationErr.name = false
      this.validationErr.type = false
      // Check if `file` is null
      if (!this.formData.file) this.validationErr.file = true
      if (!this.formData.name) this.validationErr.name = true
      if (!this.formData.type) this.validationErr.type = true

      if (!this.validationErr.file && !this.validationErr.name && !this.validationErr.type) {
        this.formValid = true
      }
    },
    getId() {
      const documentType = this.documentTypes
        ? Object.values(this.documentTypes).find((type) => type.name === this.formData.type)
        : null
      return documentType ? documentType.id : null
    },
    async onSubmit() {
      this.errorMessage = false

      this.validate()
      if (this.formValid) {
        console.log('sended data:', this.formData)

        try {
          const formData = new FormData()
          formData.append('document', this.formData.file)
          formData.append('documentName', this.formData.name)
          formData.append('documentTypeId', this.formData.id)
          console.log(formData)
          await this.volunteerStore.setDocument(formData, this.$route.params.volunteerId)
        } catch (error) {
          this.errorMessage = true
          console.error('Error uploading file:', error)
        }
        this.$emit('saved')
      }
    }
  },
  watch: {
    'formData.type'(newType) {
      this.formData.id = this.getId()
      console.log(`Type changed to: ${newType}, ID set to: ${this.formData.id}`)
    }
  },

  async mounted() {
    await this.volunteerStore.getVolunteerDocumentTypes()
    this.documentTypes = this.volunteerStore.volunteerDocumentTypes
  }
}
</script>
