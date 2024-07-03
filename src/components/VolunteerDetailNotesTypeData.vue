<template>
  <!-- Icon -->
  <IconMail class="text-vologray-600/60" v-if="type == 'E-Mail'" />
  <IconMemo class="text-vologray-600/60" v-if="type == 'Notiz'" />
  <IconPhoneIngoing class="text-vologray-600/60" v-if="type == 'Eingehender Anruf'" />
  <IconPhoneOutgoing class="text-vologray-600/60" v-if="type == 'Ausgehender Anruf'" />
  <!-- Description -->
  <p class="inline pl-4" v-if="type == 'E-Mail'">E-Mail</p>
  <p class="inline pl-4" v-else-if="type == 'Notiz'">Notiz</p>
  <p class="inline pl-4" v-else-if="type == 'Eingehender Anruf'">Telefonat</p>
  <p class="inline pl-4" v-else-if="type == 'Ausgehender Anruf'">Telefonat</p>
  <p class="inline pl-4" v-else>{{ type }}</p>
</template>

<script>
import IconMail from './IconMail.vue'
import IconMemo from './IconMemo.vue'
import IconPhoneIngoing from './IconPhoneIngoing.vue'
import IconPhoneOutgoing from './IconPhoneOutgoing.vue'
export default {
  components: {
    IconMail,
    IconMemo,
    IconPhoneOutgoing,
    IconPhoneIngoing
  },
  props: {
    type: {
      type: String,
      required: true
    }
  }
}
</script>
