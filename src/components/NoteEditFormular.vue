<template>
  <section class="w-[70vw] max-w-[850px] min-w-[400px]" @keydown.esc="$emit('cancel')">
    <header class="flex justify-center p-5 border-solid border-b border-vologray-200">
      <h2 class="text-[20px] text-bold font-medium">Notiz bearbeiten</h2>
    </header>
    <main class="p-8">
      <!-- <p
        v-if="errorMessage"
        class="flex justify-center text-sm font-light rounded border border-1 mb-4 p-3 bg-red-100 border-red-500 text-red-500"
      >
        🤷‍♀️ Upsi! Da ist wohl was schief gelaufen... Versuchs bitte nochmal.
      </p> -->

      <div v-if="!volunteerStore.fetching" class="flex justify-center">
        <!-- left column -->
        <div class="flex-1">
          <p class="text-[13px] text-vologray-400 pe-20">
            Bearbeite hier deine Notiz für {{ volunteerStore.selectedVolunteer.person.firstname }}.
          </p>
        </div>
        <!-- right column -->
        <div class="flex-1">
          <form class="flex flex-col gap-2" id="edit-note" @submit.prevent="onSubmit" novalidate>
            <FormularSelectBox
              :list="['Eingehender Anruf', 'Ausgehender Anruf', 'E-Mail', 'Notiz']"
              label="Typ"
              id="type"
              name="type"
              v-model="noteCopy.type"
            />

            <FormularTextarea
              label="Notiz"
              id="note"
              name="note"
              rows="6"
              v-model="noteCopy.note"
            />
          </form>
        </div>
      </div>
    </main>

    <footer class="flex justify-between p-6 border-solid border-t border-vologray-200">
      <ButtonStandard @click.prevent="$emit('cancel')">Abbrechen</ButtonStandard>
      <ButtonStandard type="submit" form="edit-note">Notiz neu anlegen</ButtonStandard>
    </footer>
  </section>
</template>

<script>
import ButtonStandard from './ButtonStandard.vue'
import { useVolunteerStore } from '@/stores/VolunteerStore'
import FormularSelectBox from './FormularSelectBox.vue'
import FormularTextarea from './FormularTextarea.vue'
export default {
  components: { ButtonStandard, FormularSelectBox, FormularTextarea },
  setup() {
    const volunteerStore = useVolunteerStore()

    return {
      volunteerStore
    }
  },
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      noteCopy: { ...this.note }
    }
  },
  methods: {
    async onSubmit() {
      let note = {
        type: this.noteCopy.type,
        note: this.noteCopy.note.trim()
      }

      let id = this.noteCopy.id

      try {
        await this.volunteerStore.editNote(note, id)
      } catch (error) {
        console.error(error)

        // Showing error message just for 5 seconds
        this.errorMessage = true
        setTimeout(() => {
          this.errorMessage = false
        }, 5000)
        return
      }

      this.$emit('savedEdit')
    }
  }
}
</script>
