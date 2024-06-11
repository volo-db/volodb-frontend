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
      <div v-if="!projectStore.fetching"   class="flex justify-center p-8">
        
        <button @click="currentPage = 1" class="self-center mr-4">
          <PageArrowLeft :ArrowLeftColor="currentPage === 1 ? 'lightgrey' : 'blue'" />
        </button>
        <div v-if="!projectStore.fetching" class="flex justify-center">
          <!-- left column -->
          <div class="flex-1">
            <p class="text-[13px] text-vologray-400 pe-2 md:pe-20" >
              Lege hier im ersten Schritt, die Einsatzstelle mit ein paar grundlegenden Daten an.
              Alle weiteren Details kannst du im nächsten Schritt ergänzen.
            </p>
          </div>
          <!-- right column -->
          <!-- Page 1-->
          <div class="flex-1" v-if="currentPage === 1">
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
                ref="name"
              />
              <FormularInput
                label="Kurzform"
                id="shorthand"
                :required="true"
                :hasError="validationErr.shorthand"
                type="text"
                v-model="formData.shorthand"
              />
              <FormularTextarea
                label="Beschreibung"
                id="description"
                :hasError="validationErr.description"
                name="description"
                rows="3"
                v-model="formData.description"
              />
              <FormularInput
                label="E-mail"
                id="email"
                :required="true"
                :hasError="validationErr.email"
                type="email"
                v-model="formData.email"
              />
              <FormularInput
                label="Telefon"
                id="phone"
                :required="true"
                :hasError="validationErr.phone"
                type="text"
                v-model="formData.phone"
              />
            </form>
          </div>
          <!-- Page 2 -->
          <div class="flex-1" v-if="currentPage === 2">
            <form
              class="flex flex-col gap-2"
              id="new-project"
              @submit.prevent="onSubmit"
              novalidate
            >
            <FormularInput
                label="Straße"
                id="street"
                :required="true"
                :hasError="validationErr.street"
                type="text"
                v-model="formData.street"
              />
              <FormularInput
                label="Postleitzahl"
                id="postalcode"
                :required="true"
                :hasError="validationErr.postalcode"
                type="text"
                v-model="formData.postalcode"
              />
              <FormularInput
                label="Stadt"
                id="city"
                :required="true"
                :hasError="validationErr.city"
                type="text"
                v-model="formData.city"
              />
 
             <FormularSelectBox 
             :list="countryStore.sortedCountries"
             label="Land"
             id="country"
             name="country"
             :hasError="validationErr.country"  
             v-model="formData.country"        
             :required="true"
             />

            </form>
          </div>
        </div>
        <button class="self-center ml-4">
          <PageArrowRight
            @click="currentPage = 2"
            :ArrowRightColor="currentPage === 1 ? 'blue' : 'lightgrey'"
          />
        </button>
      </div>
      <div class="text-sm text-center text-vologray-400">{{ currentPage }} / 2</div>
    </main>
    <div
      v-if="projectStore.fetching"
      class="p-4 flex flex-row gap-2 justify-center items-center text-md"
    >
      <IconSpinner />speichere daten...
    </div>
    <footer class="flex justify-between p-6 border-solid border-t border-vologray-200">
      <ButtonStandard @click.prevent="$emit('close')">Abbrechen</ButtonStandard>
      <p class="flex justify-center text-sm font-light rounded border border-1 mb-4 p-3 bg-red-100 border-red-500 text-red-500" v-if="pageOneErr === true">Eingabefelder auf Seite 1 prüfen</p>
      <ButtonStandard type="submit" form="new-project" :disabled="currentPage === 1" :class="{'bg-opacity-70' : currentPage === 1 }">Einsatzstelle anlegen</ButtonStandard>
    </footer>
  </section>
</template>

<script>
import ButtonStandard from './ButtonStandard.vue'
import { useProjectStore } from '@/stores/ProjectStore'
import { useCountryStore } from '@/stores/CountryStore'
import { isValidEmail, isValidPhoneNumber } from '@/utils/validations'
import IconSpinner from '@/components/IconSpinner.vue'
import PageArrowLeft from './PageArrowLeft.vue'
import PageArrowRight from './PageArrowRight.vue'
import FormularInput from './FormularInput.vue'
import FormularTextarea from './FormularTextarea.vue'
import FormularSelectBox from './FormularSelectBox.vue'

export default {
  setup() {
    const projectStore = useProjectStore()
    const countryStore = useCountryStore()
    return {
      projectStore, countryStore
    }
  },
  // directives: { focus },
  components: { ButtonStandard, IconSpinner, PageArrowLeft, PageArrowRight, FormularInput, FormularTextarea, FormularSelectBox },
  data() {
    return {
      currentPage: 1,
      pageOneErr: false,
      formData: {
        name: '',
        description: null,
        email: '',
        phone: '',
        street: '',
        postalcode: '',
        city: '',
        country: 'Deutschland',
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

      if (!this.formData.email || !isValidEmail(this.formData.email))
        this.validationErr.email = true

      this.formData.phone = this.formData.phone.split(' ').join('')
      if (!this.formData.phone || !isValidPhoneNumber(this.formData.phone))
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

// reminder to check page 2 if submit is not working but page 2 has no errors
      if(
         this.currentPage === 2 
      && this.validationErr.name
      || this.validationErr.phone
      || this.validationErr.email
      || this.validationErr.shorthand)
     this.pageOneErr = true
     setTimeout(() => {
            this.pageOneErr = false
          }, 5000)

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
        this.$emit('close')
       //
       // for redirect to new project detail page instead of just closing:
       // confetti()
      // this.$emit('saved', this.projectStore.selectedProject.id)
      

      }
    },
  },

  mounted() {
  this.$refs.name.focus()
  this.countryStore.getCountries()
}
}
</script>
