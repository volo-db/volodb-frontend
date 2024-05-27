<template>
  <div class="flex justify-between items-center w-96 h-11 bg-white px-4 py-2 border rounded-md">
    <input
      class="outline-none placeholder-vologray-300 w-full"
      type="text"
      placeholder="Suche nach Freiwilligen"
    />
    <IconSearch class="text-vologray-700" />
  </div>
</template>
<script>
import IconSearch from '../components/IconSearch.vue'

export default {
  components: { IconSearch }
}
</script>
