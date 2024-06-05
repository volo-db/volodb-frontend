<template>
  <section class="w-[70vw] max-w-[850px] min-w-[400px]" @keydown.esc="$emit('close')">
    <header class="flex justify-center p-5 border-solid border-b border-vologray-200">
      <h2 class="text-[20px] text-bold font-medium">Neue Einsatzstelle</h2>
    </header>
    <main>
      <p
        v-if="errorMessage"
        class="flex justify-center text-sm font-light rounded border border-1 mb-4 p-3 bg-red-100 border-red-500 text-red-500"
      >
        🤷‍♀️ Upsi! Da ist wohl was schief gelaufen... Versuchs bitte nochmal.
      </p>
      <div class="flex p-8" v-if="!projectStore.fetching">
        <button @click="currentSite = 1" class="self-center mr-4">
          <PageArrowLeft :ArrowLeftColor="currentSite === 1 ? 'lightgrey' : 'blue'" />
        </button>
        <div v-if="!projectStore.fetching" class="flex justify-center">
          <!-- left column -->
          <div class="flex-1">
            <p class="text-[13px] text-vologray-400 pe-20">
              Lege hier im ersten Schritt, die Einsatzstelle mit ein paar grundlegenden Daten an.
              Alle weiteren Details kannst du im nächsten Schritt ergänzen.
            </p>
          </div>
          <!-- right column -->
          <!-- Site 1-->
          <div class="flex-1" v-if="currentSite === 1">
            <form
              class="flex flex-col gap-2"
              id="new-project"
              @submit.prevent="onSubmit"
              novalidate
            >
              <FormularInput
                label="Name"
                id="name"
                :required="true"
                :hasError="validationErr.name"
                type="text"
                v-model="formData.name"
                v-focus
              />

              <!-- <div class="flex flex-col gap-1">
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
            </div> -->
            <div class="flex flex-col gap-1">
                <label
                  class="text-vologray-500 font-normal"
                  for="shorthand"
                  :class="{ 'error-label': validationErr.shorthand }"
                  >Kurzform*</label
                >
                <input
                  class="p-2 border border-vologray-500 rounded-md"
                  :class="{ 'error-animation': validationErr.shorthand }"
                  type="text"
                  id="shorthand"
                  v-model="formData.shorthand"
                  required
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
                  rows="4"
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
          <!-- Site 2 -->
          <div class="flex-1" v-if="currentSite === 2">
            <form
              class="flex flex-col gap-2"
              id="new-project"
              @submit.prevent="onSubmit"
              novalidate
            >
              <div class="flex flex-col gap-1">
                <label
                  class="text-vologray-500 font-normal"
                  for="street"
                  :class="{ 'error-label': validationErr.street }"
                  >Straße*</label
                >
                <input
                  class="p-2 border border-vologray-500 rounded-md"
                  :class="{ 'error-animation': validationErr.street }"
                  type="text"
                  id="street"
                  v-model="formData.street"
                  required
                />
              </div>
              <div class="flex flex-col gap-1">
                <label
                  class="text-vologray-500 font-normal"
                  for="postalcode"
                  :class="{ 'error-label': validationErr.postalcode }"
                  >Postleitzahl*</label
                >
                <input
                  class="p-2 border border-vologray-500 rounded-md"
                  :class="{ 'error-animation': validationErr.city }"
                  id="postalcode"
                  v-model="formData.postalcode"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label
                  class="text-vologray-500 font-normal"
                  for="city"
                  :class="{ 'error-label': validationErr.city }"
                  >Stadt*</label
                >
                <input
                  class="p-2 border border-vologray-500 rounded-md"
                  :class="{ 'error-animation': validationErr.city }"
                  type="text"
                  id="city"
                  v-model="formData.city"
                  required
                />
              </div>
              <div class="flex flex-col gap-1">
                <label
                  class="text-vologray-500 font-normal"
                  for="country"
                  :class="{ 'error-label': validationErr.country }"
                  >Land*</label
                >
                <input
                  class="p-2 border border-vologray-500 rounded-md"
                  :class="{ 'error-animation': validationErr.country }"
                  type="text"
                  id="country"
                  v-model="formData.country"
                  required
                />
              </div>

            </form>
          </div>
        </div>
        <button class="self-center ml-4">
          <PageArrowRight
            @click="currentSite = 2"
            :ArrowRightColor="currentSite === 1 ? 'blue' : 'lightgrey'"
          />
        </button>
      </div>
      <div class="text-sm text-center text-vologray-400">{{ currentSite }} / 2</div>
    </main>
    <div
      v-if="projectStore.fetching"
      class="p-4 flex flex-row gap-2 justify-center items-center text-md"
    >
      <IconSpinner />speichere daten...
    </div>
    <footer class="flex justify-between p-6 border-solid border-t border-vologray-200">
      <ButtonStandard @click.prevent="$emit('close')">Abbrechen</ButtonStandard>
      <ButtonStandard type="submit" form="new-project">Einsatzstelle anlegen</ButtonStandard>
    </footer>
  </section>
</template>

<script>
import ButtonStandard from './ButtonStandard.vue'
import { useProjectStore } from '@/stores/ProjectStore'
import { isValidEmail, isValidPhoneNumber } from '@/utils/validations'
import IconSpinner from '@/components/IconSpinner.vue'
import PageArrowLeft from './PageArrowLeft.vue'
import PageArrowRight from './PageArrowRight.vue'
import FormularInput from './FormularInput.vue'
// custom directive to focus on input when forumlar is mounted
const focus =  {
  mounted(el) {
    const input = el.querySelector('input')
    if (input) {
      input.focus()
    } 
    }
  }

export default {
  setup() {
    const projectStore = useProjectStore()

    return {
      projectStore
    }
  },
  directives: { focus },
  components: { ButtonStandard, IconSpinner, PageArrowLeft, PageArrowRight, FormularInput },
  data() {
    return {
      currentSite: 1,
      formData: {
        name: '',
        description: null,
        email: '',
        phone: '',
        street: '',
        postalcode: '',
        city: '',
        country: '',
        shorthand: ''
      },
      validationErr: {
        name: false,
        email: false,
        phone: false,
        street: false,
        postalcode: false,
        city: false,
        country: false,
        shorthand: false
      },
      formValid: false,
      errorMessage: false,
      successMessage: false
    }
  },
  methods: {
    validate() {
      this.formValid = false
      this.validationErr.name = false
      this.validationErr.email = false
      this.validationErr.phone = false
      this.validationErr.street = false
      this.validationErr.postalcode = false
      this.validationErr.city = false
      this.validationErr.country = false
      this.validationErr.shorthand = false

      // validate fields:
      if (!this.formData.name) this.validationErr.name = true

      if (!this.formData.email && !isValidEmail(this.formData.email))
        this.validationErr.email = true

      this.formData.phone = this.formData.phone.split(' ').join('')
      if (!this.formData.phone && !isValidPhoneNumber(this.formData.phone))
        this.validationErr.phone = true

      if (!this.formData.street) this.validationErr.street = true
      if (!this.formData.postalcode) this.validationErr.postalcode = true
      if (!this.formData.city) this.validationErr.city = true
      if (!this.formData.country) this.validationErr.country = true
      if (!this.formData.shorthand) this.validationErr.shorthand = true

      // check for errors, no errors -> form is valid
      if (
        !this.validationErr.name &&
        !this.validationErr.email &&
        !this.validationErr.phone &&
        !this.validationErr.street &&
        !this.validationErr.postalcode &&
        !this.validationErr.city &&
        !this.validationErr.country &&
        !this.validationErr.shorthand
      )
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
          description: this.formData.description,
          email: this.formData.email,
          phone: this.formData.phone,
          street: this.formData.street,
          postalCode: this.formData.postalcode,
          city: this.formData.city,
          country: this.formData.country,
          shorthand: this.formData.shorthand
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
    },
  },
}
</script>
