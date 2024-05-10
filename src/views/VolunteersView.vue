<template>
  <main class="flex justify-between bg-vologray-100 pt-6 px-8">
    <div class="flex justify-between w-96 h-11 bg-white px-4 py-2 border rounded-md">
    <input
      class="outline-none placeholder-vologray-300"
      type="text"
      placeholder="Suche nach Freiwilligen"
    />
    <IconSearch />
  </div>
  <BaseButton>Freiwillige:n anlegen</BaseButton>
  </main>
  
</template>
<script>
import BaseButton from '@/components/BaseButton.vue';
import IconSearch from '../components/IconSearch.vue';

export default {
  name: 'VolunteersView',
  components:  {IconSearch, BaseButton}
}
</script>
<style></style>
