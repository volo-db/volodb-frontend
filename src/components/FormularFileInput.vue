<template>
  <div class="flex flex-col gap-1">
    <label class="text-vologray-500 font-normal" :class="{ 'error-label': hasError }" :for="id"
      >{{ label }}<span v-if="required">*</span>

      <input
        class="p-2 border border-vologray-500 rounded-md file:border-transparent file:rounded-md file:bg-vologray-100 hover:file:border-solid hover:file:border-vologray-500"
        :class="{
          'error-animation': hasError
        }"
        :name="name"
        :type="type"
        :id="id"
        :required="required"
        :placeholder="placeholder"
        :value="''"
        @input="handleInput"
        ref="input"
      />
    </label>
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
