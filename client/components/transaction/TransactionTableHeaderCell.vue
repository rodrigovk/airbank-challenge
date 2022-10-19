<template>
  <div class="table-cell px-2 py-3 text-gray-400 font-medium">
    <button class="flex flex-row" @click="onSort">
      {{ label }}
      <TriangleIcon v-if="sortField === field" class="w-5 h-5 text-stone-500 fill-current" :class="(sortField === field && sortOrder === 'asc') ? 'rotate-180' : ''" />
    </button>
  </div>
</template>

<script setup>
import TriangleIcon from '../icon/TriangleIcon.vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  field: {
    type: String,
    required: true,
  },
  sortField: {
    type: String,
    required: true,
  },
  sortOrder: {
    type: String,
    required: true,
  }
})

const emit = defineEmits(['onSort'])

const onSort = () => {
  emit('onSort', props.field)
}
</script>
