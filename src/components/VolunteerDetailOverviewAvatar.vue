<template>
  <div class="relative border-[3px] border-green-300 rounded-full p-2 group">
    <img
      class="aspect-square w-[110px] object-cover rounded-full transition group-hover:blur-sm"
      :src="src"
      :alt="alt"
    />
    <div>
      <form>
        <label
          class="cursor-pointer absolute top-1/2 left-1/2 p-2 bg-white rounded-full shadow-md transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition"
          for="edit"
          ><IconPenEdit
        /></label>
        <input id="edit" type="file" hidden @change="$emit('fileSelected', $event)" name="avatar" />
      </form>
    </div>
  </div>
</template>

<script>
import IconPenEdit from '@/components/IconPenEdit.vue'

export default {
  components: { IconPenEdit },
  props: ['src', 'alt']
}
</script>
