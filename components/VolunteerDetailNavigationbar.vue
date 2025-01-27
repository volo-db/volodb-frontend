<template>
  <div class="flex text-[15px] text-vologray-700">
    <nav class="flex gap-5 border-b border-b-1 border-vologray-700">
      <a
        v-for="(navItem, i) in navigation"
        :key="i"
        class="pb-6 cursor-pointer hover:text-black hover:border-b-2 hover:border-voloblue-200 hover:pb-6"
        :class="{
          'text-black': String(navItem).toLowerCase() === active,
          'border-b-2': String(navItem).toLowerCase() === active,
          'border-voloblue-200': String(navItem).toLowerCase() === active,
          'pb-6': String(navItem).toLowerCase() === active
        }"
        @click.prevent="this.$emit('navLinkClick', navItem)"
        >{{ navItem }}</a
      >
    </nav>
  </div>
</template>
<script>
export default {
  props: {
    navigation: {
      type: Array,
      required: true
    },
    active: {
      type: String,
      required: true
    }
  }
}
</script>
<style></style>
