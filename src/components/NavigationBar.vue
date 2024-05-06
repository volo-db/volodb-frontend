<template>
  <div class="w-[70px] bg-white">
    <div class="flex justify-center items-center aspect-square">
      <img :src="smallVolodbLogo" alt="volodb-logo" class="" />
    </div>
    <div>
      <slot name="nav-button"> </slot>
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
