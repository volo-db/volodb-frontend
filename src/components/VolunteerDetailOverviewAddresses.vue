<template>
  <details v-if="addresses" class="mb-2" open>
    <summary class="font-medium">Anschriften</summary>
    <div class="flex flex-col mt-4">
      <div
        v-for="address of addresses"
        class="flex flex-column items-center gap-2 border-voloblue-200/60 rounded-lg p-2"
        :key="address.id"
        :class="{ border: address.status === 'ACTIVE' }"
      >
        <div class="m-1">
          <p class="text-sm">- {{ address.name }} -</p>
          <p>{{ address.street }}</p>
          <p>{{ address.postalcode }} {{ address.city }}</p>
          <p v-if="!(address.country == 'Germany')">
            {{ address.country }}
          </p>
        </div>
      </div>
    </div>
    <div class="pt-3 flex flex-col items-center text-2xl text-vologray-800">
      <button @click.prevent="newAddressModal = true"><IconPlus /></button>
    </div>
  </details>
  <ContainerModal v-if="true">
    <AddressFormular />
  </ContainerModal>
</template>

<script>
import AddressFormular from './AddressFormular.vue'
import ContainerModal from './ContainerModal.vue'
import IconDashboard from './IconDashboard.vue'
import IconPlus from './IconPlus.vue'
export default {
  components: { IconDashboard, IconPlus, ContainerModal, AddressFormular },
  setup() {},
  props: {
    addresses: {
      type: Object
    }
  },
  data() {
    return {
      newAddressModal: false
    }
  }
}
</script>
