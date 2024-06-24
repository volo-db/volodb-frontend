<template>
  <div class="flex flex-col gap-1">
    <label class="text-vologray-500 font-normal" :class="{ 'error-label': hasError }" :for="id"
      >{{ label }}<span v-if="required">*</span>
    </label>
    <textarea
      class="p-2 border border-vologray-500 rounded-md"
      :class="{ 'error-animation': hasError }"
      :type="type"
      :id="id"
      :required="required"
      :placeholder="placeholder"
      :value="modelValue"
      :rows="rows"
      :cols="cols"
      :name="name"
      @input="$emit('update:modelValue', $event.target.value)"
    >
    </textarea>
  </div>
</template>

<script>
export default {
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
      type: String
    },
    hasError: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    rows: {
      type: String
    },
    cols: {
      type: String
    },
    name: {
      type: String
    }
  },
  emits: ['update:modelValue']
}
</script>
