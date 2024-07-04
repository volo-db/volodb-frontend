<template>
  <section class="w-[70vw] max-w-[850px] min-w-[400px]" @keydown.esc="$emit('close')">
    <header class="flex justify-center p-5 border-solid border-b border-vologray-200">
      <h2 class="text-[20px] text-bold font-medium">Neuer Kontakt für</h2>
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
            Lege hier eine neue Kontaktmöglichekeit für an
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
            <FormularInput
              label="Name"
              placeholder="zu Hause / Einsatzstelle / WG"
              id="value"
              :required="true"
              :hasError="validationErr.value"
              v-model="formData.value"
              ref="value"
            />
            <FormularInput
              label="Care Of"
              id="careOf"
              :required="false"
              :hasError="validationErr.value"
              v-model="formData.value"
            />
            <FormularInput
              label="Straße"
              id="street"
              :required="true"
              :hasError="validationErr.value"
              v-model="formData.value"
            />
            <FormularInput
              label="PLZ"
              id="zipCode"
              :required="true"
              :hasError="validationErr.value"
              v-model="formData.value"
            />
            <FormularInput
              label="Ort"
              id="city"
              :required="true"
              :hasError="validationErr.value"
              v-model="formData.value"
            />
            <FormularInput
              label="Land"
              id="country"
              :required="true"
              :hasError="validationErr.value"
              v-model="formData.value"
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
      <div
        v-if="volunteerStore.fetching"
        class="p-4 flex flex-row gap-2 justify-center items-center text-md"
      >
        <IconSpinner />speichere daten...
      </div>
    </main>
    <footer class="flex justify-between p-6 border-solid border-t border-vologray-200">
      <ButtonStandard @click.prevent="$emit('close')" :gray="true">Abbrechen</ButtonStandard>
      <ButtonStandard type="submit" form="new-volunteer"
        >{{ valueLabel }} hinzufügen</ButtonStandard
      >
    </footer>
  </section>
</template>
<script>
import ButtonStandard from './ButtonStandard.vue'
import { useVolunteerStore } from '@/stores/VolunteerStore'
import { useCountryStore } from '@/stores/CountryStore'
import { isValidEmail, isValidPhoneNumber } from '@/utils/validations'
import FormularInput from './FormularInput.vue'
import FormularSelectBox from './FormularSelectBox.vue'
import IconSpinner from './IconSpinner.vue'

export default {
  components: { ButtonStandard, IconSpinner, FormularInput, FormularSelectBox },
  setup() {
    const volunteerStore = useVolunteerStore()
    const countryStore = useCountryStore()
    countryStore.getCountries()

    return {
      volunteerStore,
      countryStore
    }
  },
  data() {
    return {
      validationErr: {
        type: false,
        mobile: false
      },
      formData: {
        type: 'Email',
        value: ''
      },
      contactTypes: [],
      formValid: false,
      errorMessage: false,
      valueLabel: 'Email'
    }
  },
  methods: {
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // TODO: Validate values according to type
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    validate() {
      // clear the table ;-)
      this.formValid = false
      this.validationErr.type = false
      this.validationErr.value = false

      // Validate fields:
      // Gender
      if (!this.formData.type) this.validationErr.type = true

      // Mobile
      if (!this.formData.value) this.validationErr.value = true

      // If theres no error -> form is valid
      if (!this.validationErr.type && !this.validationErr.value) this.formValid = true
    },
    async onSubmit() {
      this.errorMessage = false

      this.validate()
      if (this.formValid) {
        let backendType = undefined

        switch (this.formData.type) {
          case 'Email':
          case 'WhatsApp':
          case 'Signal':
          case 'Threema':
          case 'Telegram':
          case 'Instagram':
            backendType = this.formData.type.toLowerCase()
            break
          case 'Mobil':
            backendType = 'mobile'
            break
          case 'Festnetz':
            backendType = 'landline'
            break
        }

        let contact = {
          type: backendType,
          value: this.formData.value
        }

        try {
          await this.contactStore.setContact(this.volo.id, contact)
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
        this.$emit('close')
      }
    }
  },
  async beforeMount() {},
  mounted() {
    this.$refs.type.focus()
  }
}
</script>
