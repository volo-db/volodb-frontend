<template>
  <div class="flex justify-center bg-white text-voloblue-200 border-t border-b-white rounded-b-md">
    <div class="h-auto w-[75px] mr-auto"></div>
    <div class="flex items-center">
      <!-- toFirst and one backward -->
      <button class="ml-auto" @click="pageToFirst()">
        <IconArrowCircleLeftLeft class="text-2xl" />
      </button>
      <button class="mx-8" @click="pageBackward()">
        <IconArrowCircleLeft class="text-2xl" />
      </button>
      <div class="text-black">
        Seite {{ currentPage + 1 }} von
        {{ totalPages }}
      </div>
      <!-- toLast and one forward -->
      <button class="mx-8" @click="pageForward()">
        <IconArrowCircleLeft class="text-2xl rotate-180" />
      </button>
      <button @click="pageToLast()">
        <IconArrowCircleLeftLeft class="text-2xl rotate-180" />
      </button>
    </div>
    <formular-select-box
      :list="[10, 15, 25, 50, 100]"
      v-model="currentLength"
      class="ml-auto m-2 w-[75px]"
    />
  </div>
</template>

<script>
import FormularSelectBox from './FormularSelectBox.vue'
import IconArrowCircleLeft from './IconArrowCircleLeft.vue'
import IconArrowCircleLeftLeft from './IconArrowCircleLeftLeft.vue'
export default {
  components: { FormularSelectBox, IconArrowCircleLeftLeft, IconArrowCircleLeft },
  data() {
    return {
      currentLength: null
    }
  },
  props: {
    currentPage: Number,
    totalPages: Number,
    pageLength: Number
  },
  watch: {
    currentLength(newValue) {
      this.$emit('updateLength', Number(newValue))
    }
  },
  methods: {
    pageBackward() {
      if (this.currentPage > 0) {
        this.$emit('updatePage', this.currentPage - 1)
      }
    },
    pageForward() {
      if (this.currentPage !== this.totalPages - 1) {
        this.$emit('updatePage', this.currentPage + 1)
      }
    },
    pageToLast() {
      this.$emit('updatePage', this.totalPages - 1)
    },
    pageToFirst() {
      this.$emit('updatePage', 0)
    }
  },
  beforeMount() {
    this.currentLength = String(this.pageLength)
  }
}
</script>
