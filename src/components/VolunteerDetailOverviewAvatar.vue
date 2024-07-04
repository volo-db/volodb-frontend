<template>
  <div class="relative border-[3px] border-green-300 rounded-full p-2 group">
    <div>
      <img
        class="aspect-square w-[110px] object-cover rounded-full transition group-hover:blur-sm"
        :src="src"
        :alt="alt"
      />
      <div>
        <form>
          <label
            class="cursor-pointer absolute top-1/2 left-1/2 p-2 bg-vologray-200 rounded-full shadow-md transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition"
            for="edit"
            ><IconPenEdit
          /></label>
          <input id="edit" type="file" hidden @change="fileSelected" name="avatar" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useVolunteerStore } from '@/stores/VolunteerStore.js'
import IconPenEdit from '@/components/IconPenEdit.vue'

export default {
  setup() {
    const volunteerStore = useVolunteerStore()
    const baseUrl = import.meta.env.VITE_BASE_URL

    return {
      volunteerStore,
      baseUrl
    }
  },

  components: { IconPenEdit },
  props: ['src', 'alt'],
  methods: {
    async fileSelected(event) {
      const file = event.target.files[0]

      if (file) {
        const formData = new FormData()
        formData.append('avatar', file)
        // check for file:
        for (let [key, value] of formData.entries()) {
          console.log(`${key}:`, value)
        }
        console.log(formData)
        try {
          await this.volunteerStore.editVolunteerAvatar(formData, this.$route.params.volunteerId)
        } catch (error) {
          console.log('Error editing Avatar: ', error)
        }
      }
    }
  }
}
</script>
