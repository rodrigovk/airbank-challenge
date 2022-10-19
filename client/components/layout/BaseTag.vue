<template>
  <div
    class="inline-block px-3 py-2 font-medium text-xs leading-tight rounded ease-in-out"
    :style="`background-color: ${colorCodeStyle}90`"
  >
    {{ label }}
  </div>
</template>

<script setup>
import { computed } from 'vue'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '~/tailwind.config'

const props =
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

const fullConfig = resolveConfig(tailwindConfig)

const colorCodeStyle = computed(() => {
  return props.colorCode ? `#${props.colorCode}` : fullConfig.theme.backgroundColor.stone[200]
})
</script>
