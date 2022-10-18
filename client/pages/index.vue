<template>
  <!-- <div class="flex flex-col"> -->
  <main class="flex flex-col h-screen bg-stone-50 text-slate-700">
    <div class="flex flex-col flex-1 w-11/12 md:w-10/12 overflow-y-clip mx-auto my-4 p-4 rounded-md shadow-lg bg-white">
      <h1 class="mb-4 text-xl font-semibold">
        Transactions
      </h1>
      <TransactionFilters class="mb-4" />
      <div class="flex-1" :class="loading ? 'overflow-y-hidden' : 'overflow-y-auto'" @scroll="onScroll">
        <TransactionTable :records="transactions" :loading="loading" />
        <!-- <pre>{{ transactions }}</pre> -->
      </div>
    </div>
  </main>
  <!-- </div> -->
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { QUERY_TRANSACTIONS } from '~/graphql/transaction'
import { apolloClient } from '~/plugins/apollo-client'
import TransactionFilters from '~/components/transaction/TransactionFilters.vue'
import TransactionTable from '~/components/transaction/TransactionTable.vue'

const transactions = ref([])
const loading = ref(true)
let cursor = null

onMounted(() => {
  // load()
})

const load = () => {
  loading.value = true
  apolloClient.query(
    {
      query: QUERY_TRANSACTIONS,
      variables: {
        orderBy: {
          field: 'date',
          sortOrder: 'desc'
        },
        pagination: {
          take: 50,
          cursor
        }
      }
    })
    .then((response) => { return response.data.transactions })
    .then((data) => {
      console.log('1')
      // transactions.value = data
      transactions.value = transactions.value.concat(data)
      console.log('2')
      cursor = data[data.length - 1].id
      console.log('3')
      loading.value = false
      console.log('4')
      //? disable scrolling or disable components while loading
    })
}

const onScroll = ({ target: { scrollTop, clientHeight, scrollHeight } }) => {
  if (scrollTop + clientHeight >= scrollHeight) {
    console.log('SCROLL')
    load()
    // this.loadMorePosts()
  }
}
</script>
