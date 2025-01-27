<template>
  <section class="w-[70vw] max-w-[850px] min-w-[400px]" @keydown.esc="$emit('close')">
    <header class="flex justify-center p-5 border-solid border-b border-vologray-200">
      <h2 class="text-[20px] text-bold font-medium">
        Krankheitstage von {{ volunteerStore.selectedVolunteer.person.firstname }}
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
            Passe hier die Krankheitstage von
            {{ volunteerStore.selectedVolunteer.person.firstname }} an.
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
              label="Krankeitstage"
              id="sickdays"
              type="number"
              :required="true"
              :hasError="validationErr.sickdays"
              v-model="formData.sickdays"
              ref="sickdays"
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
      <ButtonStandard type="submit" form="new-volunteer">Krankheitstage speichern</ButtonStandard>
    </footer>
  </section>
</template>
<script>
import ButtonStandard from './ButtonStandard.vue'
import { useContractStore } from '@/stores/ContractStore'
import FormularInput from './FormularInput.vue'
import IconSpinner from './IconSpinner.vue'
import { useVolunteerStore } from '@/stores/VolunteerStore'

export default {
  components: { ButtonStandard, IconSpinner, FormularInput },
  setup() {
    const contractStore = useContractStore()
    const volunteerStore = useVolunteerStore()
    return {
      contractStore,
      volunteerStore
    }
  },
  props: {
    contract: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      validationErr: {
        sickdays: false
      },
      formData: {
        sickdays: String(this.contract.sickDays)
      },
      formValid: false,
      errorMessage: false
    }
  },
  methods: {
    validate() {
      // clear the table ;-)
      this.formValid = false
      this.validationErr.sickdays = false

      // Validate fields:
      // Sickdays
      if (!this.formData.sickdays) this.validationErr.sickdays = true

      // If theres no error -> form is valid
      if (!this.validationErr.sickdays) this.formValid = true
    },
    async onSubmit() {
      this.errorMessage = false

      this.validate()
      if (this.formValid) {
        try {
          await this.contractStore.setSickDays(
            this.volunteerStore.selectedVolunteer.id,
            this.contract.id,
            this.formData.sickdays
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
    this.$refs.sickdays.focus()
  }
}
</script>
