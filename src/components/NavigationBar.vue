<template>
  <div class="w-[70px] bg-white">
    <div class="flex justify-center items-center aspect-square">
      <img :src="smallVolodbLogo" alt="volodb-logo" />
    </div>
    <div>
      <slot name="nav-icon"></slot>
    </div>
  </div>
</template>

<script>
import smallVolodbLogo from '@/assets/logos/volodb-logo-small.svg'

export default {
  data() {
    return {
      smallVolodbLogo
    }
  }
}
</script>
