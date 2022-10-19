<template>
  <div class="flex flex-col flex-1 text-sm">
    <div class="table w-full border-collapse">
      <div class="table-header-group">
        <div class="table-row border-t border-b border-gray-300">
          <TransactionTableHeaderCell label="Reference" field="reference" :sortField="sortField" :sortOrder="sortOrder" @onSort="onSort" />
          <TransactionTableHeaderCell label="Category" field="categoryName" :sortField="sortField" :sortOrder="sortOrder" @onSort="onSort" />
          <TransactionTableHeaderCell label="Date" field="date" :sortField="sortField" :sortOrder="sortOrder" @onSort="onSort" />
          <TransactionTableHeaderCell label="Amount" field="amount" :sortField="sortField" :sortOrder="sortOrder" @onSort="onSort" class="text-right" />
        </div>
      </div>
      <div class="table-row-group">
        <TransactionTableItem v-for="record in records" :key="record.id" :record="record" />
      </div>
    </div>
    <Loading v-if="loading" label="Loading transactions..." class="flex-1" />
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
  },
  sortField: {
    type: String,
    required: true
  },
  sortOrder: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['onSort'])

const onSort = (field) => {
  emit('onSort', field)
}
</script>
