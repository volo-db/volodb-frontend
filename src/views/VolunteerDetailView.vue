<template>
  <div v-if="volunteer" class="flex overflow-hidden">
    <div class="flex-none flex flex-col justify-start items-center p-8 w-[400px] overflow-auto">
      <header class="flex flex-col items-center gap-3">
        <!-- Avatar -->
        <div class="border-[3px] border-green-300 rounded-full p-2">
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
        <div class="flex flex-row border-2 border-voloblue-100 rounded-lg text-sm">
          <span class="px-1 pt-[1px] text-voloblue-100">BFD</span>
          <span class="px-1 pt-[1px] text-white bg-voloblue-100">IM EINSATZ</span>
        </div>
      </header>
      <article class="flex flex-col gap-8 w-full self-start mt-6">
        <details v-if="contacts" class="mb-2" open>
          <summary class="font-medium">Kontakt</summary>
          <div v-for="contact of contacts" :key="contact.id" class="flex flex-col gap-3 pt-3">
            <!-- Email -->
            <p v-if="contact.type === 'email'">
              <IconMail class="text-voloblue-200 text-xl mr-2" />
              <a :href="'mailto:' + contact.value">{{ contact.value }}</a>
            </p>
            <!-- Phone -->
            <p v-if="contact.type === 'mobile' || contact.type === 'landline'">
              <IconPhone class="text-voloblue-200 text-xl mr-2" />
              <a :href="'tel:' + contact.value">{{ contact.value }}</a>
            </p>

            <!-- MESSENGER: -->
            <!-- WhatsApp -->
            <p v-if="contact.type === 'whatsapp'">
              <IconMessage class="text-voloblue-200 text-xl mr-2" />
              <a :href="'https://wa.me/' + contact.value">{{ contact.value }} (WhatsApp)</a>
            </p>
            <!-- Telegram -->
            <p v-if="contact.type === 'telegram'">
              <IconMessage class="text-voloblue-200 text-xl mr-2" />
              <a :href="'https://t.me/' + contact.value">{{ contact.value }} (Telegram)</a>
            </p>
            <!-- Threema -->
            <p v-if="contact.type === 'threema'">
              <IconMessage class="text-voloblue-200 text-xl mr-2" />
              <a :href="'https://threema.id/' + contact.value + '?text='"
                >{{ contact.value }} (Threema)</a
              >
            </p>
            <!-- Instagram -->
            <p v-if="contact.type === 'instagram'">
              <IconMessage class="text-voloblue-200 text-xl mr-2" />
              <a :href="'https://ig.me/m/' + contact.value + '?text='"
                >{{ contact.value }} (Instagram)</a
              >
            </p>
            <!-- ToDo: SIGNAL -->
            <!-- <p v-if="contact.type === 'signal'">
              <IconMessage class="text-voloblue-200 text-xl mr-2" />
              <a :href="'????' + contact.value">{{ contact.value }} (Telegram)</a>
            </p> -->
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
      volunteer: null,
      contacts: null
    }
  },
  async beforeCreate() {
    await this.volunteerStore.getVolunteer(this.$route.params.volunteerId)
    this.volunteer = this.volunteerStore.selectedVolunteer
    this.contacts = this.volunteerStore.selectedVolunteerContacts
    console.log(this.volunteer)
    console.log(this.contacts)
  }
}
</script>
