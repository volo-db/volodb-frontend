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
          <div
            class="relative w-full flex justify-center items-center"
            @mouseover="hover = true"
            @mouseleave="hover = false"
          >
            <div>
              <h2 class="p-2 text-lg font-medium flex flex-col items-center">
                <p>{{ volunteer.person.firstname }}</p>
                <p>{{ volunteer.person.lastname }}</p>
              </h2>
              <!-- Birthday and -place -->
              <p v-if="volunteer.birthday" class="text-sm">
                geboren am
                <span class="font-bold">{{ getPropperDateString(volunteer.birthday) }}</span>
                in
                <span class="font-bold">{{ volunteer.birthplace }}</span>
              </p>
            </div>

            <!-- pen to edit name, gender, birthdate -->
            <button
              class="absolute right-0 top-1/2 transform -translate-y-1/2"
              v-if="hover"
              @click="newNameModal = true"
            >
              <IconPenEdit />
            </button>
          </div>
          <hr class="w-40" />
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
          <VolunteerDetailOverviewAddresses />
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
  <ContainerModal v-if="newNameModal">
    <BasicPersonalDataFormular
      @saved="onNameSaved"
      @cancel="newNameModal = false"
      :lastnameCopy="volunteer.person.lastname"
      :firstnameCopy="volunteer.person.firstname"
      :birthdayCopy="volunteer.birthday"
      :birthplaceCopy="volunteer.birthplace"
      :genderCopy="volunteer.person.gender"
    />
  </ContainerModal>
</template>
<script>
import { useVolunteerStore } from '@/stores/VolunteerStore.js'
import ContainerModal from '@/components/ContainerModal.vue'
import BasicPersonalDataFormular from '@/components/BasicPersonalDataFormular.vue'
import VolunteerDetailOverviewAvatar from './VolunteerDetailOverviewAvatar.vue'
import VolunteerDetailOverviewAddresses from './VolunteerDetailOverviewAddresses.vue'
import VolunteerDetailOverviewContact from './VolunteerDetailOverviewContact.vue'
import IconPenEdit from '@/components/IconPenEdit.vue'
import { getPropperDateString } from '@/utils/dateAndTime'

export default {
  setup() {
    const volunteerStore = useVolunteerStore()
    const baseUrl = import.meta.env.VITE_BASE_URL

    return {
      volunteerStore,
      baseUrl,
      getPropperDateString
    }
  },
  components: {
    BasicPersonalDataFormular,
    ContainerModal,
    IconPenEdit,
    VolunteerDetailOverviewAvatar,
    VolunteerDetailOverviewAddresses,
    VolunteerDetailOverviewContact
  },
  data() {
    return {
      volunteer: null,
      contacts: null,
      addresses: null,
      relevantContract: null,
      hover: false,
      newNameModal: false
    }
  },
  methods: {
    async onNameSaved() {
      this.newNameModal = false
      await this.volunteerStore.getVolunteer(this.volunteerStore.selectedVolunteer.id)
      this.volunteer = this.volunteerStore.selectedVolunteer
    },
    async editAvatar(event) {
      const file = event.target.files[0]

      if (file) {
        const formData = new FormData()
        formData.append('avatar', file)

        try {
          await this.volunteerStore.editVolunteerAvatar(formData, this.$route.params.volunteerId)
        } catch (error) {
          console.error('Error editing Avatar: ', error)
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
      }
    }
  }
}
</script>
