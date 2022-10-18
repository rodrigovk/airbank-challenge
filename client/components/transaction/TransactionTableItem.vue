<template>
  <div class="table-row border-b border-solid border-gray-200">
    <TransactionTableItemCell>
      {{ record.reference }}
    </TransactionTableItemCell>
    <TransactionTableItemCell>
      <CategoryTag :label="record.category.name" :color-code="record.category.color" />
    </TransactionTableItemCell>
    <TransactionTableItemCell>
      {{ formatedDate }}
    </TransactionTableItemCell>
    <TransactionTableItemCell class="text-right">
      <span>{{ formatedAmount }}</span>
      <span class="text-gray-400 text-xs font-medium">{{ record.currency }}</span>
    </TransactionTableItemCell>
  </div>
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
