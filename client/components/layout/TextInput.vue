<template>
  <div class="flex flex-col">
    <label>
      {{ label }}
    </label>
    <input
      type="text"
      :value="value"
      :placeholder="placeholder"
      class="p-2 h-10 rounded-sm border border-gray-300 outline-none focus:ring-0 focus:border-black transition duration-300 ease-in-out"
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
  placeholder: {
    type: String,
    default: ''
  }
})
</script>
