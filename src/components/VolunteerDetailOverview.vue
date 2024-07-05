<template>
  <div class="flex-none flex flex-col justify-start items-center p-8 w-[400px]">
    <div v-if="volunteerStore.fetching" id="skeleton-loader"></div>
    <div class="w-full" v-if="volunteer">
      <div>
        <header class="flex flex-col items-center gap-3">
          <!-- Avatar -->

          <VolunteerDetailOverviewAvatar
            :src="avatarSrc"
            :alt="`Avatar von ${volunteer.person.firstname} ${volunteer.person.lastname}`"
            @fileSelected="editAvatar"
          />

          <!-- Name -->
          <h2 class="pt-4 text-lg font-medium">
            {{ volunteer.person.firstname }} {{ volunteer.person.lastname }}
          </h2>
          <!-- Project -->
          <p class="text-sm" v-if="relevantContract">
            Einsatzstelle:
            <span class="font-medium">{{ relevantContract.project.name }}</span>
          </p>
          <!-- Status-Pill -->
          <div class="flex flex-row border-2 border-voloblue-100 rounded-lg text-sm">
            <span class="px-1 pt-[1px] text-voloblue-100" v-if="relevantContract">{{
              relevantContract.program
            }}</span>
            <span class="px-1 pt-[1px] text-white bg-voloblue-100">{{ volunteer.status }}</span>
          </div>
        </header>
        <article class="flex flex-col gap-8 w-full self-start mt-6">
          <!-- contact section -->

          <VolunteerDetailOverviewContact />

          <!-- address section -->
          <details v-if="addresses" class="mb-2" open>
            <summary class="font-medium">Anschriften</summary>
            <div class="flex flex-col gap-4 mt-4">
              <div v-for="address of addresses" class="text-vologray-600" :key="address.id">
                <p class="text-sm">{{ address.name }}</p>
                <p :class="{ 'text-black': address.status === 'ACTIVE' }">{{ address.street }}</p>
                <p :class="{ 'text-black': address.status === 'ACTIVE' }">
                  {{ address.postalcode }} {{ address.city }}
                </p>
                <p
                  v-if="!(address.country == 'Germany')"
                  :class="{ 'text-black': address.status === 'ACTIVE' }"
                >
                  {{ address.country }}
                </p>
              </div>
            </div>
          </details>
          <details v-if="false" class="mb-2">
            <summary class="font-medium">FW-Dienstverlauf</summary>
            <ul class="flex flex-col gap-3 pt-3">
              <li>Station 1</li>
              <li>Station 2</li>
              <li>Station 3</li>
            </ul>
          </details>
        </article>
      </div>
    </div>
  </div>
</template>
<script>
import { useVolunteerStore } from '@/stores/VolunteerStore.js'
import IconMail from '@/components/IconMail.vue'
import IconPhone from '@/components/IconPhone.vue'
import IconMessenger from '@/components/IconMessenger.vue'
import VolunteerDetailOverviewAvatar from './VolunteerDetailOverviewAvatar.vue'
import VolunteerDetailOverviewContact from './VolunteerDetailOverviewContact.vue'


export default {
  setup() {
    const volunteerStore = useVolunteerStore()
    const baseUrl = import.meta.env.VITE_BASE_URL

    return {
      volunteerStore,
      baseUrl
    }
  },
  components: {
    IconMail,
    IconPhone,
    IconMessenger,
    VolunteerDetailOverviewAvatar
    VolunteerDetailOverviewContact

  },
  data() {
    return {
      volunteer: null,
      contacts: null,
      addresses: null,
      relevantContract: null
    }
  },
  methods: {
    async editAvatar(event) {
      const file = event.target.files[0]

      if (file) {
        const formData = new FormData()
        formData.append('avatar', file)
        // check for file in console:
        for (let [key, value] of formData.entries()) {
          console.log(`${key}:`, value)
        }

        try {
          await this.volunteerStore.editVolunteerAvatar(formData, this.$route.params.volunteerId)
        } catch (error) {
          console.log('Error editing Avatar: ', error)
        } finally {
          await this.volunteerStore.getVolunteer(this.$route.params.volunteerId)
          this.volunteer = this.volunteerStore.selectedVolunteer
        }
      }
    }
  },
  computed: {
    // Computed property to generate a new avatar src URL with a cache-busting query parameter
    avatarSrc() {
      return this.volunteer ? `${this.baseUrl}/files/${this.volunteer.avatar}?t=${Date.now()}` : ''
    }
  },

  async beforeMount() {
    await this.volunteerStore.getVolunteer(this.$route.params.volunteerId)
    this.volunteer = this.volunteerStore.selectedVolunteer
    this.contacts = this.volunteerStore.selectedVolunteerContacts
    this.addresses = this.volunteerStore.selectedVolunteerAddresses
    this.relevantContract = this.volunteerStore.selectedVolunteerRelevantContract
  },
  watch: {
    volunteer(newVal) {
      if (newVal) {
        // Automatically updates the `volunteer` property based on the store's `selectedVolunteer`
        this.volunteer = this.volunteerStore.selectedVolunteer
        console.log('watch')
      }
    }
  }
}
</script>
