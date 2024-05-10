<template>
  <teleport to="#modal-section">
    <div
      class="w-screen h-screen bg-vologray-600/40 backdrop-blur-[6px] flex justify-center items-center"
    >
      <div class="bg-white drop-shadow-md rounded-md">
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>
<script>
export default {
  name: 'ModalContainer'
}
</script>
