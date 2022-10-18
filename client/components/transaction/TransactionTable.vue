<template>
  <div>
    <div class="text-sm">
      <div class="table w-full border-collapse">
        <div class="table-header-group">
          <div class="table-row border-t border-b border-gray-300">
            <TransactionTableHeaderCell label="Reference" />
            <TransactionTableHeaderCell label="Category" />
            <TransactionTableHeaderCell label="Date" />
            <TransactionTableHeaderCell label="Amount" class="text-right" />
          </div>
        </div>
        <div class="table-row-group">
          <TransactionTableItem v-for="record in records" :key="record.id" :record="record" />
        </div>
        <Loading v-if="loading" label="Loading transactions..." class="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Loading from '~~/components/layout/Loading.vue'
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
