<template>
  <!-- <div class="flex flex-col"> -->
  <main class="flex flex-col bg-stone-50 text-slate-700">
    <div class="block mx-auto flex-1 w-11/12 md:w-10/12 my-4 p-4 rounded-md shadow-lg bg-white">
      <h1 class="mb-4 text-xl font-semibold">
        Transactions
      </h1>
      <TransactionFilters class="mb-4" />
      <TransactionTable :records="transactions" :loading="loading" />
      <pre>{{ transactions }}</pre>
    </div>
  </main>
  <!-- </div> -->
</template>

<script setup>
import { ref } from 'vue'
import { QUERY_TRANSACTIONS } from '~/graphql/transaction'
import { apolloClient } from '~/plugins/apollo-client'
import TransactionFilters from '~/components/transaction/TransactionFilters.vue'
import TransactionTable from '~/components/transaction/TransactionTable.vue'

const transactions = ref([])
const loading = ref(true)

apolloClient.query(
  {
    query: QUERY_TRANSACTIONS,
    variables: {
      orderBy: {
        field: 'date',
        sortOrder: 'desc'
      }
    }
  })
  .then((response) => { return response.data.transactions })
  .then((data) => {
    transactions.value = data
    loading.value = false
  })
</script>
