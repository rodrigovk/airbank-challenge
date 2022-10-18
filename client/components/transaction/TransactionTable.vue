<template>
  <div>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else class="text-sm">
      <div class="table w-full border-collapse">
        <div class="table-header-group">
          <div class="table-row border-t border-b border-gray-300">
            <TransactionTableHeaderCell label="Reference" />
            <TransactionTableHeaderCell label="Category" />
            <TransactionTableHeaderCell label="Date" />
            <TransactionTableHeaderCell label="Amount" />
          </div>
        </div>
        <div class="table-row-group">
          <TransactionTableItem v-for="abc in records" :key="abc.id" :record="abc" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TransactionTableHeaderCell from '~~/components/transaction/TransactionTableHeaderCell.vue'
import TransactionTableItem from '~/components/transaction/TransactionTableItem.vue'

defineProps({
  records: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    required: true
  }
})
</script>
