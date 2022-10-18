<template>
  <div class="table-cell p-2 text-gray-400">
    {{ label }}
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  }
})
</script>
