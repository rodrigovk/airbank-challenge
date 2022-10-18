<template>
  <div class="table-cell px-2 py-3 text-gray-400 font-medium">
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
