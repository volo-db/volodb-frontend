<template>
  <!-- button standard is blue, for gray version use prop 'gray' -->
  <button
    class="border rounded-lg text-white text-sm bg-voloblue-200 px-6 h-11"
    :class="{
      'bg-vologray-800': gray
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
