<template>
  <div>
    <h1>Volunteers</h1>
    <base-button @click.prevent="newVolunteerModal = true">Neue:r Freiwillige:r</base-button>
    <modal-container v-if="newVolunteerModal">
      <new-volunteer @close="newVolunteerModal = false" />
    </modal-container>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue'
import ModalContainer from '@/components/ModalContainer.vue'
import NewVolunteer from '@/components/NewVolunteer.vue'
export default {
  name: 'VolunteersView',
  components: { BaseButton, ModalContainer, NewVolunteer },
  data() {
    return {
      newVolunteerModal: false
    }
  }
}
</script>

<style></style>
