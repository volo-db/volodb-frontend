<template>
  <details v-if="addresses" class="mb-2" open>
    <summary class="font-medium">Anschriften</summary>
    <div class="flex flex-col mt-4">
      <div
        v-for="address of addresses"
        class="flex items-center justify-between rounded-lg p-2 group"
        :key="address.id"
        :class="{
          border: address.status === 'ACTIVE',
          'font-bold': address.status === 'ACTIVE',
          'order-first': address.status === 'ACTIVE'
        }"
      >
        <div class="m-1">
          <p class="text-sm">- {{ address.name }} -</p>
          <p>{{ address.street }}</p>
          <p>{{ address.postalcode }} {{ address.city }}</p>
          <p v-if="!(address.country == 'Deutschland')">
            {{ address.country }}
          </p>
        </div>
        <div class="flex gap-2">
          <button
            @click.prevent="(selectedAddress = address), (addressModal = true)"
            class="hidden group-hover:inline"
          >
            <IconPenEdit />
          </button>
          <button @click.prevent="deleteAdress(address)" class="hidden group-hover:inline">
            <IconTrash />
          </button>
        </div>
      </div>
    </div>
    <div class="pt-3 flex flex-col items-center text-2xl text-vologray-800">
      <button @click.prevent="addressModal = true"><IconPlus /></button>
    </div>
  </details>
  <ContainerModal v-if="addressModal">
    <AddressFormular
      :address="selectedAddress"
      @close="addressModal = false"
      @saved="updateAddresses"
    />
  </ContainerModal>
</template>

<script>
import AddressFormular from './AddressFormular.vue'
import ContainerModal from './ContainerModal.vue'
import { useVolunteerStore } from '@/stores/VolunteerStore'
import IconPlus from './IconPlus.vue'
import IconPenEdit from './IconPenEdit.vue'
import IconTrash from './IconTrash.vue'
export default {
  components: { IconPlus, ContainerModal, AddressFormular, IconPenEdit, IconTrash },
  setup() {
    const volunteerStore = useVolunteerStore()

    return { volunteerStore }
  },
  data() {
    return {
      addressModal: false,
      addresses: null,
      selectedAddress: null
    }
  },
  methods: {
    async updateAddresses() {
      // this.selectedAddress = null
      await this.volunteerStore.getVolunteer(this.$route.params.volunteerId)
      this.addresses = this.volunteerStore.selectedVolunteerAddresses
    },
    async deleteAdress(address) {
      if (address.status === 'ACTIVE') {
        window.alert(
          'Es ist nicht möglich die Hauptadresse zu löschen. Markiere zunächst eine andere Adresse als Hauptadresse oder lege eine solche an.'
        )
        return
      }
      const confirm = window.confirm(`Möchtest du die Adresse "${address.name}" wirklich löschen?"`)
      if (confirm) {
        await this.volunteerStore.deleteVolunteerAddress(address.id)
        this.updateAddresses()
      }
    }
  },
  async beforeMount() {
    await this.updateAddresses()
  }
}
</script>
