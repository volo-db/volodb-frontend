<template>
  <button
    class="w-full flex justify-center items-center text-voloblue-200 text-xl border-l-4 py-5 opacity-100"
    :class="{
      'border-l-voloblue-200 bg-vologray-100 ': active,
      'opacity-50 border-transparent': !active,
      'hover:border-l-voloblue-200 hover:bg-vologray-100 hover:opacity-100 hover:shadow-inner':
        !active
    }"
  >
    <IconLogin v-if="type == 'login'" />
    <IconDashboard v-if="type == 'dashboard'" />
    <IconVolunteers v-if="type == 'volunteers'" />
    <IconProjects v-if="type == 'projects'" />
    <IconSeminars v-if="type == 'seminars'" />
    <IconMail v-if="type == 'mail'" />
    <IconSettings v-if="type == 'settings'" />
    <IconLogout v-if="type == 'logout'" />
  </button>
</template>

<script>
import IconLogin from '@/components/IconLogin.vue'
import IconDashboard from '@/components/IconDashboard.vue'
import IconVolunteers from '@/components/IconVolunteers.vue'
import IconProjects from '@/components/IconProject.vue'
import IconSeminars from '@/components/IconSeminars.vue'
import IconMail from '@/components/IconMail.vue'
import IconSettings from '@/components/IconSettings.vue'
import IconLogout from '@/components/IconLogout.vue'

export default {
  components: {
    IconLogin,
    IconDashboard,
    IconVolunteers,
    IconProjects,
    IconSeminars,
    IconMail,
    IconSettings,
    IconLogout
  },
  name: 'NavBarButton',
  props: ['type', 'active']
}
</script>
