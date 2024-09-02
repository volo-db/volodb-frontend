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
      :name="name"
      :type="type"
      :id="id"
      :required="required"
      :placeholder="placeholder"
      :value="type !== 'file' ? modelValue : ''"
      @input="handleInput"
      ref="input"
    />
    <span v-if="type === 'file' && modelValue && modelValue.name">
      Selected file: {{ modelValue.name }}
    </span>
  </div>
</template>

<script>
export default {
  expose: ['focus'],
  props: {
    name: {
      type: String
    },
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
      type: [String, Array, File],
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
      if (this.type !== 'file') {
        this.$emit('update:modelValue', event.target.value)
      }

      if (this.type === 'file') {
        const file = event.target.files[0] || null
        this.$emit('update:modelValue', file) // Pass File object
      }
    },

    focus() {
      this.$refs.input.focus()
    }
  }
}
</script>
