<template>
  <div>
    <img :src="smallVolodbLogo" alt="volodb-logo" class="mt-8 mx-auto">
  </div>
</template>

<script>
import smallVolodbLogo from '@/assets/volodb-logo-small.svg'

export default {
    data() {
        return {
            smallVolodbLogo,
        }
    }
}
</script>
