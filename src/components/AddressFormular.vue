<template>
  <section class="w-[70vw] max-w-[850px] min-w-[400px]" @keydown.esc="$emit('close')">
    <header class="flex justify-center p-5 border-solid border-b border-vologray-200">
      <h2 class="text-[20px] text-bold font-medium">
        Neue Adresse für {{ volunteerStore.selectedVolunteer.person.firstname }}
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
            Lege hier eine neue Kontaktmöglichekeit für
            {{ volunteerStore.selectedVolunteer.person.firstname }} an
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
              :hasError="validationErr.name"
              v-model="formData.name"
              ref="addressName"
            />
            <FormularInput
              label="Care Of"
              placeholder="c/o Huber"
              id="careOf"
              :required="false"
              v-model="formData.careOf"
            />
            <FormularInput
              label="Straße"
              id="street"
              :required="true"
              :hasError="validationErr.street"
              v-model="formData.street"
            />
            <FormularInput
              label="PLZ"
              id="postalCode"
              :required="true"
              :hasError="validationErr.postalCode"
              v-model="formData.postalCode"
            />
            <FormularInput
              label="Ort"
              id="city"
              :required="true"
              :hasError="validationErr.city"
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

            <div class="flex gap-2 items-center mt-4">
              <input
                class="p-2 border border-vologray-500 rounded-md"
                type="checkbox"
                id="primaryAddressYes"
                v-model="formData.primaryAddress"
                :disabled="firstAddress"
              />
              <label class="text-vologray-500 font-normal" for="primaryAddressYes"
                >Hauptadresse?
              </label>
            </div>
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
        >Addresse {{ address ? 'speichern' : 'hinzufügen' }}</ButtonStandard
      >
    </footer>
  </section>
</template>
<script>
import ButtonStandard from './ButtonStandard.vue'
import { useVolunteerStore } from '@/stores/VolunteerStore'
import { useCountryStore } from '@/stores/CountryStore'
import FormularInput from './FormularInput.vue'
import FormularSelectBox from './FormularSelectBox.vue'
import IconSpinner from './IconSpinner.vue'

export default {
  components: { ButtonStandard, IconSpinner, FormularInput, FormularSelectBox },
  setup() {
    const volunteerStore = useVolunteerStore()
    const countryStore = useCountryStore()

    countryStore.getCountries()
    const firstAddress = !Boolean(volunteerStore.selectedVolunteerAddresses.length)
    return {
      volunteerStore,
      countryStore,
      firstAddress
    }
  },
  props: {
    address: {
      type: Object
    }
  },
  data() {
    return {
      validationErr: {
        name: false,
        street: false,
        postalCode: false,
        city: false,
        country: false
      },
      formData: {
        name: this.address ? this.address.name : '',
        careOf: this.address ? this.address.careof : '',
        street: this.address ? this.address.street : '',
        postalCode: this.address ? this.address.postalcode : '',
        city: this.address ? this.address.city : '',
        country: this.address ? this.address.country : 'Deutschland',
        primaryAddress: this.firstAddress
          ? true
          : this.address
            ? this.address.status === 'ACTIVE'
              ? true
              : false
            : false
      },
      formValid: false,
      errorMessage: false
    }
  },
  methods: {
    validate() {
      // clear the table ;-)
      this.formValid = false
      this.validationErr.name = false
      this.validationErr.street = false
      this.validationErr.postalCode = false
      this.validationErr.city = false
      this.validationErr.country = false

      // Validate fields:
      // Name
      if (!this.formData.name) this.validationErr.name = true

      // Street
      if (!this.formData.street) this.validationErr.street = true

      // postalCode
      if (!this.formData.postalCode) this.validationErr.postalCode = true

      // City
      if (!this.formData.city) this.validationErr.city = true

      // Country
      if (!this.formData.country) this.validationErr.country = true

      // If theres no error -> form is valid
      if (
        !this.validationErr.name &&
        !this.validationErr.street &&
        !this.validationErr.postalCode &&
        !this.validationErr.city &&
        !this.validationErr.country
      )
        this.formValid = true
    },
    async onSubmit() {
      this.errorMessage = false

      this.validate()
      if (this.formValid) {
        let address = {
          id: this.address ? this.address.id : null,
          status: this.formData.primaryAddress ? 'ACTIVE' : 'INACTIVE',
          name: this.formData.name,
          careof: this.formData.careOf,
          country: this.formData.country,
          street: this.formData.street,
          postalcode: this.formData.postalCode,
          city: this.formData.city
        }
        try {
          await this.volunteerStore.setVolunteerAddresses(
            this.volunteerStore.selectedVolunteer.id,
            address
          )
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
  mounted() {
    this.$refs.addressName.focus()
  }
}
</script>
