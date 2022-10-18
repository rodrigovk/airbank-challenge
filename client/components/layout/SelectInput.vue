<template>
  <div class="flex flex-col">
    <label>
      {{ label }}
    </label>
    <select
      :value="initialvalue"
      :placeholder="placeholder"
      :disabled="disabled"
      class="p-2 h-10 rounded-sm border border-gray-300 outline-none focus:ring-0 focus:border-black transition duration-300 ease-in-out"
    >
      <slot />
    </select>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  initialvalue: {
    type: String,
    default: ''
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
</script>
