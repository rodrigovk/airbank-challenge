<template>
  <div
    class="inline-block px-3 py-1.5 font-medium text-xs leading-tight rounded ease-in-out"
    :style="'background-color:#'+colorCode"
  >
    {{ label }}
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  colorCode: {
    type: String,
    required: true
  }
})
</script>
