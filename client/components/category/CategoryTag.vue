<template>
  <BaseTag :label="label" :color-code="colorCode" />
</template>

<script setup>
import BaseTag from '~/components/layout/BaseTag.vue'

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
