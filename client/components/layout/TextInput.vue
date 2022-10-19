<template>
  <div class="flex flex-col">
    <label>
      {{ label }}
    </label>
    <input
      type="text"
      :value.trim="value"
      @input="$emit('input', $event.target.value)"
      :placeholder="placeholder"
      :disabled="disabled"
      @change="onChange"
      class="p-2 h-10 rounded-sm border border-gray-300 outline-none focus:ring-0 focus:border-black transition duration-300 ease-in-out"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['change'])

const onChange = (event) => {
  emit('change', event)
}
</script>
