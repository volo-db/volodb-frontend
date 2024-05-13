<template>
  <main class="bg-vologray-100 px-8">
    <div class="flex justify-between pt-6">
      <div class="flex justify-between w-96 h-11 bg-white px-4 py-2 border rounded-md">
        <input
          class="outline-none placeholder-vologray-300"
          type="text"
          placeholder="Suche nach Freiwilligen"
        />
        <IconSearch />
      </div>
      <BaseButton>Freiwillige:n anlegen</BaseButton>
    </div>
    <TableComponent class="w-full mt-12" />
  </main>
</template>
<script>
import BaseButton from '@/components/BaseButton.vue'
import IconSearch from '../components/IconSearch.vue'
import TableComponent from '../components/TableComponent.vue'

export default {
  name: 'VolunteersView',
  components: { IconSearch, BaseButton, TableComponent }
}
</script>
<style></style>
