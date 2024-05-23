<template>
  <div v-if="volunteer" class="flex overflow-hidden">
    <div class="flex-none flex flex-col justify-start items-center p-8 w-[400px] overflow-auto">
      <header class="flex flex-col items-center gap-3">
        <!-- Avatar -->
        <div class="border border-[3px] border-green-300 rounded-full p-2">
          <img
            :src="baseUrl + '/files/' + volunteer.avatar"
            alt="Avatar von ausgewähltem Freiwilligen"
            class="aspect-square w-[110px] object-cover rounded-full"
          />
        </div>
        <!-- Name -->
        <h2 class="pt-4 text-lg font-medium">
          {{ volunteer.person.firstname }} {{ volunteer.person.lastname }}
        </h2>
        <!-- Project -->
        <p class="text-sm">
          Einsatzstelle: <span class="font-medium">Kindergarten Kleeblatt</span>
        </p>
        <!-- Status-Pill -->
        <div class="flex flex-row border border-2 border-voloblue-100 rounded-lg text-sm">
          <span class="px-1 pt-[1px] text-voloblue-100">BFD</span>
          <span class="px-1 pt-[1px] text-white bg-voloblue-100">IM EINSATZ</span>
        </div>
      </header>
      <article class="flex flex-col gap-8 w-full self-start mt-6">
        <details class="mb-2" open>
          <summary class="font-medium">Kontakt</summary>
          <div class="flex flex-col gap-3 pt-3">
            <p><icon-message class="text-voloblue-200 text-xl mr-2" /> WhatsApp</p>
            <p><icon-mail class="text-voloblue-200 text-xl mr-2" /> feli.friedmann@gmail.com</p>
            <p><icon-phone class="text-voloblue-200 text-xl mr-2" />+49 (0) 151 27584313</p>
          </div>
        </details>
        <details class="mb-2">
          <summary class="font-medium">Anschrift</summary>
          <div class="flex flex-col gap-3 pt-3">
            <p>Unterm Auto 9</p>
            <p>12345 Musterhause</p>
            <p>Deutschland</p>
          </div>
        </details>
        <details class="mb-2">
          <summary class="font-medium">FW-Dienstverlauf</summary>
          <div class="flex flex-col gap-3 pt-3">
            <p>Unterm Auto 9</p>
            <p>12345 Musterhause</p>
            <p>Deutschland</p>
          </div>
        </details>
      </article>
    </div>
    <div class="flex-1 bg-vologray-100">Context</div>
  </div>
</template>
<script>
import { useVolunteerStore } from '@/stores/VolunteerStore.js'
import IconMail from '@/components/IconMail.vue'
import IconPhone from '@/components/IconPhone.vue'
import IconMessage from '@/components/IconMessage.vue'
export default {
  components: { IconMail, IconPhone, IconMessage },
  name: 'VolunteerDetailView.vue',
  setup() {
    const volunteerStore = useVolunteerStore()
    const baseUrl = import.meta.env.VITE_BASE_URL

    return {
      volunteerStore,
      baseUrl
    }
  },
  data() {
    return {
      volunteer: null
    }
  },
  async beforeCreate() {
    await this.volunteerStore.loadVolunteer(this.$route.params.volunteerId)
    this.volunteer = this.volunteerStore.selectedVolunteer
  }
}
</script>
