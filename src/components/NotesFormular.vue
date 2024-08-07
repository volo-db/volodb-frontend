<template>
  <section class="w-[70vw] max-w-[850px] min-w-[400px]" @keydown.esc="$emit('cancel')">
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

      <div v-if="!volunteerStore.fetching" class="flex justify-center">
        <!-- left column -->
        <div class="flex-1">
          <p class="text-[13px] text-vologray-400 pe-20">
            {{ description }}
          </p>
        </div>
        <!-- right column -->
        <div class="flex-1">
          <form
            ref="notesForm"
            class="flex flex-col gap-2"
            :id="id"
            @keydown="keyPressed($event)"
            @submit.prevent="onSubmit"
            novalidate
          >
            <!-- for editing a note -->

            <FormularSelectBox
              :list="['Eingehender Anruf', 'Ausgehender Anruf', 'E-Mail', 'Notiz']"
              label="Typ"
              id="type"
              name="type"
              :required="true"
              :hasError="validationErr.type"
              v-model="formData.note.type"
            />
            <FormularTextarea
              label="Notiz"
              id="note"
              name="note"
              rows="6"
              ref="note"
              :required="true"
              :hasError="validationErr.note"
              v-model="formData.note.note"
            />
          </form>
        </div>
      </div>
      <div v-if="volunteerStore.fetching" class="flex gap-2 justify-center items-center text-md">
        <IconSpinner />
        <p>{{ loadingText }}</p>
      </div>
    </main>
    <footer class="flex justify-between p-6 border-solid border-t border-vologray-200">
      <ButtonStandard @click.prevent="$emit('cancel')" :gray="true">Abbrechen</ButtonStandard>
      <ButtonStandard type="submit" :form="id">{{ submitButtonText }}</ButtonStandard>
    </footer>
  </section>
</template>

<script>
import ButtonStandard from './ButtonStandard.vue'
import { useVolunteerStore } from '@/stores/VolunteerStore'
import FormularSelectBox from './FormularSelectBox.vue'
import FormularTextarea from './FormularTextarea.vue'
import IconSpinner from './IconSpinner.vue'

export default {
  components: { ButtonStandard, FormularSelectBox, FormularTextarea, IconSpinner },
  props: {
    title: String,
    description: String,
    id: String,
    loadingText: String,
    submitButtonText: String,
    noteCopy: Object
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
        note: { ...this.noteCopy }
      },
      validationErr: {
        type: false,
        note: false
      },

      formValid: false,
      errorMessage: false,
      cmdPressed: true
    }
  },
  methods: {
    keyPressed(e) {
      if (e.metaKey && e.key.toLowerCase() === 'enter') this.onSubmit()
    },
    validate() {
      this.formValid = false
      this.validationErr.type = false
      this.validationErr.note = false

      if (!this.formData.note.type) this.validationErr.type = true
      if (!this.formData.note.note) this.validationErr.note = true

      if (!this.validationErr.type && !this.validationErr.note) this.formValid = true
    },
    async onSubmit() {
      this.errorMessage = false

      this.validate()
      if (this.formValid) {
        let note = {
          type: this.formData.note.type,
          note: this.formData.note.note.trim()
        }

        let id = this.formData.note.id

        try {
          await this.volunteerStore.setNote(note, id)
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
    this.$refs.note.focus()
  }
}
</script>
