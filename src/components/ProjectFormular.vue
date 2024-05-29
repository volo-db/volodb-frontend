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
            Lege hier im ersten Schritt, die Einsatzstelle mit ein paar grundlegenden Daten an.
            Alle weiteren Details kannst du im nächsten Schritt ergänzen.
          </p>
        </div>
 <!-- right column -->
 <div class="flex-1">
<form class="flex flex-col gap-2"
            id="new-project"
            @submit.prevent="onSubmit"
            novalidate>
            <div class="flex flex-col gap-1">
                <label class="text-vologray-500 font-normal" for="name">Name der Einsatzstelle*</label>
                <input class="p-2 border border-vologray-500 rounded-md" type="text" id="name" v-model="formData.name" required>
            </div>
            <div class="flex flex-col gap-1">
                <label class="text-vologray-500 font-normal" for="description">Beschreibung*</label>
                <textarea class="p-2 border border-vologray-500 rounded-md" rows="5" id="description" v-model="formData.description" required></textarea>
            </div>
            <div class="flex flex-col gap-1">
                <label class="text-vologray-500 font-normal" for="email">Email*</label>
                <input class="p-2 border border-vologray-500 rounded-md" type="text" id="email" v-model="formData.email" required>
            </div>
            <div class="flex flex-col gap-1">
                <label class="text-vologray-500 font-normal" for="phone">Telefon*</label>
                <input class="p-2 border border-vologray-500 rounded-md" type="text" id="phone" v-model="formData.phone" required>
            </div>
</form>
</div>

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
    export default {
        setup() {
    const projectStore = useProjectStore()

    return {
      projectStore
    }
  },  
  components: { ButtonStandard }, 
  data() {
    return {
        formData: {
            name: '',
            description: '',
            email: '',
            phone: ''
        }
    }
  }
    }
</script>