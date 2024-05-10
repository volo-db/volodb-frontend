<template>
  <div>
    <h1>Volunteers</h1>
    <base-button @click.prevent="newVolunteerModal = true">Neue:r Freiwillige:r</base-button>
    <modal-container v-if="newVolunteerModal">
      <section class="w-[60vw] max-w-[850px]">
        <header class="flex justify-center p-5 border-solid border-b border-vologray-200">
          <h2 class="text-[20px] text-bold font-medium">Neue:r Freiwillige:r</h2>
        </header>
        <main class="flex justify-center p-8">
          <!-- Left column -->
          <div class="flex-1">
            <p class="text-[13px] text-vologray-400 pe-20">
              Lege hier im ersten Schritt, die freiwillige Person an mit ein paar grundlegenden
              Daten an. Alle weiteren Details kannst du im nächsten Schritt ergänzen.
            </p>
          </div>
          <!-- Right column -->
          <div class="flex-1">
            <form
              class="flex flex-col gap-2"
              id="new-volunteer"
              @submit.prevent="console.log('gesendet... 🖂')"
            >
              <div class="flex flex-col gap-1">
                <label class="text-vologray-500 font-normal" for="name">Name*</label>
                <input
                  class="p-2 border border-vologray-500 rounded-md"
                  type="text"
                  id="name"
                  required
                />
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-vologray-500 font-normal" for="firstname">Vorname*</label>
                <input
                  class="p-2 border border-vologray-500 rounded-md"
                  type="text"
                  id="firstname"
                  required
                />
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-vologray-500 font-normal" for="sex">Geschlecht*</label>
                <select
                  class="p-2 border border-vologray-500 rounded-md"
                  type="text"
                  id="sex"
                  required
                >
                  <option value="female">weiblich</option>
                  <option value="male">männlich</option>
                  <option value="divers">divers</option>
                  <option value="not-selected">keine Angaben</option>
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-vologray-500 font-normal" for="email">E-Mail*</label>
                <input
                  class="p-2 border border-vologray-500 rounded-md"
                  type="email"
                  id="email"
                  required
                />
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-vologray-500 font-normal" for="mobile">Mobil</label>
                <input
                  class="p-2 border border-vologray-500 rounded-md"
                  type="tel"
                  id="mobile"
                  required
                />
              </div>
            </form>
          </div>
        </main>
        <footer class="flex justify-between p-6 border-solid border-t border-vologray-200">
          <base-button @click.prevent="newVolunteerModal = false">Abbrechen</base-button>
          <base-button type="submit" form="new-volunteer">Freiwillige:n anlegen</base-button>
        </footer>
      </section>
    </modal-container>
  </div>
</template>
<script>
import BaseButton from '@/components/BaseButton.vue'
import ModalContainer from '@/components/ModalContainer.vue'
export default {
  name: 'VolunteersView',
  components: { BaseButton, ModalContainer },
  data() {
    return {
      newVolunteerModal: false
    }
  }
}
</script>
<style></style>
