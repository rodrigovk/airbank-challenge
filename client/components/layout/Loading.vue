<template>
  <div class="flex flex-row items-center">
    <SpinLoading svg-class="w-6 h-6 text-stone-500" />
    <p class="ml-2 text-md font-medium text-stone-500">
      {{ label }}
    </p>
  </div>
</template>

<script setup>
import SpinLoading from './SpinLoading.vue';

defineProps({
  label: {
    type: String,
    default: 'Loading...'
  }
})
</script>
