<template>
  <!-- contact section -->
  <details v-if="contacts" class="mb-2 w-full" open>
    <summary class="font-medium">Kontakt</summary>
    <div
      v-for="contact of contacts"
      :key="contact.id"
      class="flex flex-row gap-3 pt-3 text-sm group"
    >
      <!-- Email -->
      <p v-if="contact.type === 'email'">
        <IconMail class="text-voloblue-200 opacity-60 text-lg mr-2" />
        <a :href="'mailto:' + contact.value">{{ contact.value }}</a>
      </p>
      <!-- Phone -->
      <p v-if="contact.type === 'mobile' || contact.type === 'landline'">
        <IconPhone class="text-voloblue-200 opacity-60 text-lg mr-2" />
        <a :href="'tel:' + contact.value"
          >{{ parsePhoneNumber(contact.value, 'DE').formatInternational() }}
        </a>
      </p>

      <!-- MESSENGER: -->
      <!-- WhatsApp -->
      <p v-if="contact.type === 'whatsapp'">
        <IconMessenger class="text-voloblue-200 opacity-60 text-lg mr-2" />
        <a :href="'https://wa.me/' + contact.value">{{ contact.value }} (WhatsApp)</a>
      </p>
      <!-- Telegram -->
      <p v-if="contact.type === 'telegram'">
        <IconMessenger class="text-voloblue-200 opacity-60 text-lg mr-2" />
        <a :href="'https://t.me/' + contact.value">{{ contact.value }} (Telegram)</a>
      </p>
      <!-- Threema -->
      <p v-if="contact.type === 'threema'">
        <IconMessenger class="text-voloblue-200 opacity-60 text-lg mr-2" />
        <a :href="'https://threema.id/' + contact.value + '?text='"
          >{{ contact.value }} (Threema)</a
        >
      </p>
      <!-- Instagram -->
      <p v-if="contact.type === 'instagram'">
        <IconMessenger class="text-voloblue-200 opacity-60 text-lg mr-2" />
        <a :href="'https://ig.me/m/' + contact.value + '?text='">{{ contact.value }} (Instagram)</a>
      </p>
      <!-- ToDo: SIGNAL -->
      <!-- <p v-if="contact.type === 'signal'">
              <IconMessenger class="text-voloblue-200 text-lg mr-2" />
              <a :href="'????' + contact.value">{{ contact.value }} (Telegram)</a>
            </p> -->
      <div class="flex gap-2 ml-auto">
        <button
          @click.prevent="(selectedContact = contact), (newContactModal = true)"
          class="hidden group-hover:inline"
        >
          <IconPenEdit />
        </button>
        <button @click.prevent="deleteContact(contact)" class="hidden group-hover:inline">
          <IconTrash />
        </button>
      </div>
    </div>
    <div class="pt-3 flex flex-col items-center text-2xl text-vologray-800">
      <button @click.prevent="(selectedContact = null), (newContactModal = true)">
        <IconPlus />
      </button>
    </div>
    <ContainerModal v-if="newContactModal">
      <ContactFormular
        @close="newContactModal = false"
        @saved="updateVolo"
        :contact="selectedContact"
      />
    </ContainerModal>
  </details>
</template>
<script>
import { useVolunteerStore } from '@/stores/VolunteerStore.js'
import IconMail from '@/components/IconMail.vue'
import IconPhone from '@/components/IconPhone.vue'
import IconMessenger from '@/components/IconMessenger.vue'
import IconPlus from '@/components/IconPlus.vue'
import IconPenEdit from './IconPenEdit.vue'
import IconTrash from './IconTrash.vue'
import ContainerModal from './ContainerModal.vue'
import ContactFormular from './ContactFormular.vue'
import { parsePhoneNumber } from 'libphonenumber-js'

export default {
  setup() {
    const volunteerStore = useVolunteerStore()
    const baseUrl = import.meta.env.VITE_BASE_URL

    return {
      volunteerStore,
      baseUrl,
      parsePhoneNumber
    }
  },
  components: {
    IconMail,
    IconPhone,
    IconMessenger,
    IconPlus,
    IconPenEdit,
    IconTrash,
    ContainerModal,
    ContactFormular
  },
  data() {
    return {
      contacts: null,
      volunteer: null,
      selectedContact: null,
      newContactModal: false
    }
  },
  methods: {
    async updateVolo() {
      await this.volunteerStore.getVolunteer(this.$route.params.volunteerId)
      this.volunteer = this.volunteerStore.selectedVolunteer
      this.contacts = this.volunteerStore.selectedVolunteerContacts
    },
    async updateContacts() {
      await this.volunteerStore.getVolunteer(this.$route.params.volunteerId)
      this.contacts = this.volunteerStore.selectedVolunteerContacts
    },
    async deleteContact(contact) {
      const confirm = window.confirm(
        `Möchtest du ${contact.value} (${contact.type}) wirklich löschen?"`
      )
      if (confirm) {
        await this.volunteerStore.deleteVolunteerContact(contact.id)
        this.updateContacts()
      }
    }
  },
  async beforeMount() {
    await this.updateVolo()
  }
}
</script>
