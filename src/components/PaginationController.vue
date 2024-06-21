<template>
  <div
    class="flex justify-center bg-white text-voloblue-200 text-sm py-2 border-t border-b-white rounded-b-md"
  >
    <!-- toFirst and one backward -->
    <button @click="pageToFirst()">&lt;&lt;</button>
    <button class="mx-8" @click="pageBackward()">&lt;</button>
    <div>
      {{ currentPage + 1 }} /
      {{ totalPages }}
    </div>
    <!-- toLast and one forward -->
    <button class="mx-8" @click="pageForward()">&gt;</button>
    <button @click="pageToLast()">&gt;&gt;</button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: Number,
    totalPages: Number
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
  }
}
</script>
