<template>
  <section class="w-[70vw] max-w-[850px] min-w-[400px]" @keydown.esc="$emit('close')">
    <header class="flex justify-center p-5 border-solid border-b border-vologray-200">
      <h2 class="text-[20px] text-bold font-medium">Neue Einsatzstelle</h2>
    </header>
    <main class="p-8">
      <p
        v-if="errorMessage"
        class="flex justify-center text-sm font-light rounded border border-1 mb-4 p-3 bg-red-100 border-red-500 text-red-500"
      >
        🤷‍♀️ Upsi! Da ist wohl was schief gelaufen... Versuchs bitte nochmal.
      </p>
      <div v-if="!projectStore.fetching" class="flex justify-center">
        <!-- left column -->
        <div class="flex-1">
          <p class="text-[13px] text-vologray-400 pe-20">
            Lege hier im ersten Schritt, die Einsatzstelle mit ein paar grundlegenden Daten an. Alle
            weiteren Details kannst du im nächsten Schritt ergänzen.
          </p>
        </div>
        <!-- right column -->
        <div class="flex-1">
          <form class="flex flex-col gap-2" id="new-project" @submit.prevent="onSubmit" novalidate>
            <div class="flex flex-col gap-1">
              <label
                class="text-vologray-500 font-normal"
                for="name"
                :class="{ 'error-label': validationErr.name }"
                >Name der Einsatzstelle*</label
              >
              <input
                class="p-2 border border-vologray-500 rounded-md"
                :class="{ 'error-animation': validationErr.name }"
                type="text"
                id="name"
                v-model="formData.name"
                required
                ref="name"
              />
            </div>
            <div class="flex flex-col gap-1">
              <label
                class="text-vologray-500 font-normal"
                for="description"
                :class="{ 'error-label': validationErr.description }"
                >Beschreibung</label
              >
              <textarea
                class="p-2 border border-vologray-500 rounded-md"
                rows="5"
                id="description"
                v-model="formData.description"
              ></textarea>
            </div>
            <div class="flex flex-col gap-1">
              <label
                class="text-vologray-500 font-normal"
                for="email"
                :class="{ 'error-label': validationErr.email }"
                >E-mail*</label
              >
              <input
                class="p-2 border border-vologray-500 rounded-md"
                :class="{ 'error-animation': validationErr.email }"
                type="email"
                id="email"
                v-model="formData.email"
                required
              />
            </div>
            <div class="flex flex-col gap-1">
              <label
                class="text-vologray-500 font-normal"
                for="phone"
                :class="{ 'error-label': validationErr.phone }"
                >Telefon*</label
              >
              <input
                class="p-2 border border-vologray-500 rounded-md"
                :class="{ 'error-animation': validationErr.phone }"
                type="tel"
                id="phone"
                v-model="formData.phone"
                required
              />
            </div>
          </form>
        </div>
      </div>
      <div
        v-if="projectStore.fetching"
        class="p-4 flex flex-row gap-2 justify-center items-center text-md"
      >
        <IconSpinner />speichere daten...
      </div>
    </main>
    <footer class="flex justify-between p-6 border-solid border-t border-vologray-200">
      <ButtonStandard @click.prevent="$emit('close')">Abbrechen</ButtonStandard>
      <ButtonStandard type="submit" form="new-project">Einsatzstelle anlegen</ButtonStandard>
    </footer>
  </section>
</template>

<script>
import ButtonStandard from './ButtonStandard.vue'
import { useProjectStore } from '@/stores/ProjectStore'
import { isValidEmail, isValidPhoneNumber } from '@/utils'

import IconSpinner from '@/components/IconSpinner.vue'

export default {
  setup() {
    const projectStore = useProjectStore()

    return {
      projectStore
    }
  },
  components: { ButtonStandard, IconSpinner },
  data() {
    return {
      formData: {
        name: '',
        description: '',
        email: '',
        phone: ''
      },
      validationErr: {
        name: false,
        email: false,
        phone: false
      },
      formValid: false,
      errorMessage: false,
      successMessage: false
    }
  },
  methods: {
    validate() {
      ;(this.formValid = false),
        (this.validationErr.name = false),
        (this.validationErr.email = false),
        (this.validationErr.phone = false)

      // validate fields:
      if (!this.formData.name) this.validationErr.name = true
      if (!this.formData.email && !isValidEmail(this.formData.email))
        this.validationErr.email = true
      if (!this.formData.phone && !isValidPhoneNumber(this.formData.phone))
        this.validationErr.phone = true

      // check for errors, no errors -> form is valid
      if (!this.validationErr.name && !this.validationErr.email && !this.validationErr.phone)
        this.formValid = true
    },
    async onSubmit() {
      this.errorMessage = false
      this.successMessage = false

      this.validate()
      if (this.formValid) {
        let project = {
          organisationalId: 'null',
          name: this.formData.name,
          email: this.formData.email,
          phone: this.formData.phone
        }

        try {
          await this.projectStore.setProject(project)
        } catch (error) {
          console.error(error)
          // Showing error message just for 5 seconds
          this.errorMessage = true
          setTimeout(() => {
            this.errorMessage = false
          }, 5000)

          return
        }
      }
    }
  },
  mounted() {
    this.$refs.name.focus()
  }
}
</script>
