<template>
  <section v-if="volo" class="w-[70vw] max-w-[850px] min-w-[400px]" @keydown.esc="$emit('close')">
    <header class="flex justify-center p-5 border-solid border-b border-vologray-200">
      <h2 class="text-[20px] text-bold font-medium">
        Neuer Kontakt für {{ volo.person.firstname }}
      </h2>
    </header>
    <main class="p-8">
      <p
        v-if="errorMessage"
        class="flex justify-center text-sm font-light rounded border border-1 mb-4 p-3 bg-red-100 border-red-500 text-red-500"
      >
        🤷‍♀️ Upsi! Da ist wohl was schief gelaufen... Versuchs bitte nochmal.
      </p>
      <div v-if="!contactStore.fetching" class="flex justify-center">
        <!-- left column -->
        <div class="flex-1">
          <p class="text-[13px] text-vologray-400 pe-20">
            Lege hier eine neue Kontaktmöglichekeit für {{ volo.person.firstname }} an
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
            <FormularSelectBox
              :list="[
                'Email',
                'Mobil',
                'Festnetz',
                'WhatsApp',
                'Signal',
                'Threema',
                'Telegram',
                'Instagram'
              ]"
              label="Kontakttyp"
              id="type"
              :required="true"
              :hasError="validationErr.type"
              v-model="formData.type"
              @update:modelValue="(n) => (valueLabel = n)"
              ref="type"
            />
            <FormularInput
              :label="formData.type"
              id="value"
              :required="true"
              :hasError="validationErr.value"
              v-model="formData.value"
              ref="value"
            />
          </form>
        </div>
      </div>
      <div
        v-if="contactStore.fetching"
        class="p-4 flex flex-row gap-2 justify-center items-center text-md"
      >
        <IconSpinner />speichere daten...
      </div>
    </main>
    <footer class="flex justify-between p-6 border-solid border-t border-vologray-200">
      <ButtonStandard @click.prevent="$emit('close')" :gray="true">Abbrechen</ButtonStandard>
      <ButtonStandard type="submit" form="new-volunteer"
        >Kontakt {{ contact ? 'speichern' : 'hinzufügen' }}</ButtonStandard
      >
    </footer>
  </section>
</template>
<script>
import ButtonStandard from './ButtonStandard.vue'
import { useContactStore } from '@/stores/ContactStore'
import { useVolunteerStore } from '@/stores/VolunteerStore'
import { parsePhoneNumber, isPossiblePhoneNumber } from 'libphonenumber-js'
import FormularInput from './FormularInput.vue'
import FormularSelectBox from './FormularSelectBox.vue'
import IconSpinner from './IconSpinner.vue'

export default {
  components: { ButtonStandard, IconSpinner, FormularInput, FormularSelectBox },
  setup() {
    const contactStore = useContactStore()
    const volunteerStore = useVolunteerStore()

    return {
      contactStore,
      volunteerStore
    }
  },
  props: {
    contact: {
      type: Object
    }
  },
  data() {
    return {
      validationErr: {
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
  computed: {
    volo() {
      return this.volunteerStore.selectedVolunteer
    }
  },
  methods: {
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // TODO: Validate values according to type
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    validate() {
      // clear the table ;-)
      this.formValid = false
      this.validationErr.value = false

      // Validate fields:
      switch (this.formData.type.toLocaleLowerCase()) {
        case 'mobil':
        case 'festnetz':
          this.validationErr.value = !isPossiblePhoneNumber(this.formData.value, 'DE')
          break

        default:
          break
      }
      // Type
      if (!this.formData.type) this.validationErr.type = true

      // Value
      if (!this.formData.value) this.validationErr.value = true

      // If theres no error -> form is valid
      if (!this.validationErr.value) this.formValid = true
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
            this.formData.value = parsePhoneNumber(this.formData.value, 'DE').number
            break
          case 'Festnetz':
            backendType = 'landline'
            this.formData.value = parsePhoneNumber(this.formData.value, 'DE').number
            break
        }

        let contact = {
          id: this.contact ? this.contact.id : null,
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
  async beforeMount() {
    await this.contactStore.getContactTypes()
    this.contactStore.contactTypes.forEach((type) => {
      this.contactTypes.push(type.name)
    })

    if (this.contact) {
      let tempType = ''

      switch (this.contact.type.toLowerCase()) {
        case 'email':
          tempType = 'Email'
          break
        case 'whatsapp':
          tempType = 'WhatsApp'
          break
        case 'signal':
          tempType = 'Signal'
          break
        case 'threema':
          tempType = 'Threema'
          break
        case 'telegram':
          tempType = 'Telegram'
          break
        case 'instagram':
          tempType = 'Instagram'
          break
        case 'mobile':
          tempType = 'Mobil'
          break
        case 'landline':
          tempType = 'Festnetz'
          break
      }

      this.formData.type = tempType
      this.formData.value = this.contact.value
    }
  },
  mounted() {
    // this.$refs.type.focus()
  }
}
</script>
