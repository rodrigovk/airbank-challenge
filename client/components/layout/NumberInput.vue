<template>
  <div class="flex flex-col">
    <label>
      {{ label }}
    </label>
    <input
      type="number"
      :value="value"
      :placeholder="placeholder"
      :disabled="disabled"
      class="p-2 h-10 rounded-sm border border-gray-300 outline-none focus:ring-0 focus:border-black transition duration-300 ease-in-out"
      @input="$emit('input', $event.target.value)"
      @change="onChange"
    />
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    default: 0
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
