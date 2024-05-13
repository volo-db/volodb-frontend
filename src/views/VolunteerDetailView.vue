<template>
  <section class="flex overflow-hidden">
    <section class="flex-none flex flex-col justify-start items-center p-4 w-[400px] overflow-auto">
      <header class="flex flex-col items-center gap-3">
        <!-- Avatar -->
        <div class="border border-[3px] border-green-300 rounded-full p-2">
          <img
            src="https://www.humanistische-vereinigung.de/fileadmin/_processed_/csm_shelter_1__c6d164e540.png"
            alt="Avatar von ausgewähltem Freiwilligen"
            class="aspect-square w-[110px] object-cover rounded-full"
          />
        </div>
        <!-- Name -->
        <h2 class="pt-4 text-lg">Felicitas Friedmann</h2>
        <!-- Project -->
        <p class="text-sm">
          Einsatzstelle: <span class="font-medium">Kindergarten Kleeblatt</span>
        </p>
        <!-- Status-Pill -->
        <div class="flex flex-row border border-2 border-voloblue-100 rounded-lg text-sm">
          <span class="px-1 text-voloblue-100">BFD</span>
          <span class="px-1 text-white bg-voloblue-100">IM EINSATZ</span>
        </div>
      </header>
    </section>
    <section class="flex-1 bg-vologray-100">Context</section>
  </section>
</template>
<script>
export default {
  name: 'VolunteerDetailView.vue'
}
</script>
<style></style>
