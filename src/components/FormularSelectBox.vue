<template>
  <div class="flex flex-col">
    <label class="text-vologray-500 font-normal" :class="{ 'error-label': hasError }" :for="id"
      >{{ label }}<span v-if="required">*</span></label
    >
    <select
      class="p-2 border border-vologray-500 rounded-md"
      :id="id"
      :required="required"
      :name="name"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      ref="input"
    >
      <option v-for="(item, index) in list" :key="index" :value="item" :title="titles[index] || ''">
        {{ item }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  expose: ['focus'],
  emits: ['update:modelValue'],
  props: {
    titles: {
      type: Array,
      default: () => []
    },
    list: {
      type: Array
    },
    label: {
      type: String
    },
    required: {
      type: Boolean
    },
    id: {
      type: String
    },
    modelValue: {
      type: String
    },
    hasError: {
      type: Boolean,
      default: false
    },
    name: {
      type: String
    }
  },
  methods: {
    focus() {
      this.$refs.input.focus()
    }
  }
}
</script>
