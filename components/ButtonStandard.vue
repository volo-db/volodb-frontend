<template>
  <!-- button standard is blue, for gray version use prop 'gray' -->
  <button
    class="border-2 border-voloblue-200 rounded-lg text-white text-sm font-medium bg-voloblue-200 px-6 h-11 hover:text-voloblue-200 hover:bg-transparent hover:border-voloblue-200"
    :class="{
      'border-vologray-800': gray,
      'bg-vologray-800': gray,
      'hover:bg-transparent': gray,
      'hover:text-vologray-800': gray,
      'hover:border-vologray-800': gray
    }"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'ButtonStandard',
  props: ['gray']
}
</script>
