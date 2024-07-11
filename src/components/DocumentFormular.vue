<template>
  <section class="w-[70vw] max-w-[850px] min-w-[400px]" @keydown.esc="$emit('close')">
    <header class="flex justify-center p-5 border-solid border-b border-vologray-200">
      <h2 class="text-[20px] text-bold font-medium">{{ title }}</h2>
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
            {{ description }}
          </p>
        </div>
        <!-- right column -->
        <div class="flex-1">
          <form
            class="flex flex-col gap-2"
            id="new-document"
            @submit.prevent="onSubmit"
            @keydown="keyPressed($event)"
            novalidate
          >
            <FormularInput
              name="name"
              label="Name"
              type="text"
              id="name"
              :required="true"
              :hasError="validationErr.name"
              v-model="formData.document.name"
            />
            <FormularSelectBox
              :titles="volunteerStore.getTitlesList"
              :list="volunteerStore.getTypeList"
              label="Typ"
              id="type"
              :required="true"
              :hasError="validationErr.type"
              v-model="formData.document.documentType.name"
            />
            <FormularInput
              name="document"
              label="Dokument"
              type="file"
              id="document"
              :required="true"
              v-model="formData.document.path"
              :hasError="validationErr.document"
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
      <ButtonStandard type="submit" form="new-document">{{ submitButtonText }}</ButtonStandard>
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
  props: {
    title: String,
    description: String,
    id: String,
    loadingText: String,
    submitButtonText: String,
    documentCopy: Object
  },
  setup() {
    const volunteerStore = useVolunteerStore()

    return {
      volunteerStore
    }
  },
  data() {
    return {
      formData: {
        document: { ...this.documentCopy }
      },
      documentTypes: null,
      list: [],
      titles: [],

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
    keyPressed(e) {
      if (e.metaKey && e.key.toLowerCase() === 'enter') this.onSubmit()
    },
    validate() {
      this.formValid = false
      this.validationErr.file = false
      this.validationErr.name = false
      this.validationErr.type = false
      // Check if `file` is null
      if (!this.formData.document.path) this.validationErr.file = true
      if (!this.formData.document.name) this.validationErr.name = true
      if (!this.formData.document.documentType.name) this.validationErr.type = true

      if (!this.validationErr.file && !this.validationErr.name && !this.validationErr.type) {
        this.formValid = true
      }
    },
    getDocumentTypeId() {
      const documentType = this.documentTypes
        ? Object.values(this.documentTypes).find(
            (type) => type.name === this.formData.document.documentType.name
          )
        : null
      return documentType ? documentType.id : null
    },
    async onSubmit() {
      this.errorMessage = false

      this.validate()
      if (this.formValid) {
        let id = this.formData.document.id
        try {
          const formData = new FormData()
          formData.append('document', this.formData.document.path)
          formData.append('documentName', this.formData.document.name)
          formData.append('documentTypeId', this.formData.document.documentType.id)
          console.log(formData)

          await this.volunteerStore.setDocument(formData, id)
        } catch (error) {
          this.errorMessage = true
          console.error('Error uploading file:', error)
        }
        this.$emit('saved')
      }
    }
  },
  watch: {
    'formData.document.documentType'(newType) {
      this.formData.document.documentType.id = this.getDocumentTypeId()
      console.log(
        `Type changed to: ${newType}, ID set to: ${this.formData.document.documentType.id}`
      )
    }
  },

  async mounted() {
    await this.volunteerStore.getVolunteerDocumentTypes()
    this.documentTypes = this.volunteerStore.volunteerDocumentTypes
    console.log(
      this.formData.document,
      this.formData.document.name,
      this.formData.document.id,
      this.formData.document.documentType,
      this.formData.document.path
    )
  }
}
</script>
