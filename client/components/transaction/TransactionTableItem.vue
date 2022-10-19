<template>
  <NuxtLink :to="`/${record.id}`" class="table-row border-b border-solid border-gray-200 even:bg-gray-50">
    <TransactionTableItemCell>
      {{ record.reference }}
    </TransactionTableItemCell>
    <TransactionTableItemCell>
      <CategoryTag v-if="record.category?.name" :label="record.category?.name" :color-code="record.category?.color" />
    </TransactionTableItemCell>
    <TransactionTableItemCell>
      {{ formatedDate }}
    </TransactionTableItemCell>
    <TransactionTableItemCell class="text-right">
      <span :class="record.amount > 0 ? 'text-green-600' : 'text-red-600'">{{ formatedAmount }}</span>
      <span class="text-gray-400 text-xs font-medium">{{ record.currency }}</span>
    </TransactionTableItemCell>
  </NuxtLink>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import moment from 'moment'
import CategoryTag from '~/components/category/CategoryTag'
import TransactionTableItemCell from '~/components/transaction/TransactionTableItemCell.vue'

onMounted(() => {
})

const props = defineProps({
  record: {
    type: Object,
    required: true
  }
})

const formatedDate = computed(() => {
  return moment(props.record.date).format('DD/MM/YY')
})

const nf = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

const formatedAmount = computed(() => {
  return nf.format(props.record.amount)
})
</script>
