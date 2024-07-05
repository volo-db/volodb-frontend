<template>
  <div class="flex flex-col gap-1">
    <label class="text-vologray-500 font-normal" :class="{ 'error-label': hasError }" :for="id"
      >{{ label }}<span v-if="required">*</span>
    </label>
    <input
      class="p-2 border border-vologray-500 rounded-md"
      :class="{
        'error-animation': hasError,
        'self-start': type === 'checkbox'
      }"
      :type="type"
      :id="id"
      :required="required"
      :placeholder="placeholder"
      :value="type !== 'file' ? modelValue : ''"
      @input="handleInput"
      @change="handleChange"
      ref="input"
    />
  </div>
</template>

<script>
export default {
  expose: ['focus'],
  props: {
    label: {
      type: String
    },
    type: {
      type: String
    },
    required: {
      type: Boolean
    },
    id: {
      type: String
    },
    modelValue: {
      type: [String, Array], // Accept both String and Array
      default: ''
    },
    hasError: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  methods: {
    handleInput(event) {
      // Handle input for text fields
      if (this.type !== 'file') {
        this.$emit('update:modelValue', event.target.value)
      }
    },
    handleChange(event) {
      // Handle file input
      if (this.type === 'file') {
        this.$emit('update:modelValue', event.target.files)
      }
    },
    focus() {
      this.$refs.input.focus()
    }
  }
}
</script>
