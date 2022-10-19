<template>
  <div class="flex flex-col">
    <label>
      {{ label }}
    </label>
    <input
      :value="value"
      type="month"
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
    type: String,
    required: true
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
