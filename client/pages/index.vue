<template>
  <div class="flex flex-col flex-1 w-11/12 md:w-10/12 overflow-y-clip mx-auto my-4 p-4 rounded-md shadow-lg bg-white">
    <h1 class="mb-4 text-xl font-semibold">
      Transactions
    </h1>
    <TransactionFilters :banks="banks" :accounts="accounts" :loading="loading" @onChangeFilters="onChangeFilters"
      @reload="reload" class="mb-4" />
    <div id="transaction-table-container" class="flex flex-col flex-1"
      :class="loading ? 'overflow-y-hidden' : 'overflow-y-auto'" @scroll="onScroll">
      <TransactionTable :records="transactions" :loading="loading" :sortField="sortField" :sortOrder="sortOrder"
        @onSort="onSort" />
    </div>

    <!-- @close-modal="toggleRecordModal" -->
    <SidePanel :modalActive="recordModalActive" :closeButtonVisible="false"
      classPanel="w-full sm:w-5/6 md:w-4/6 lg:w-3/6">
      <div class="p-4">
        <div class="pb-2 border-b border-gray-300">
          <div class="flex flex-row">
            <NuxtLink to="/" class="w-fit">
              <CloseIcon class="w-5 h-5" />
            </NuxtLink>
          </div>
        </div>
        <div class="pt-2">
          <TransactionDetail :transaction-id="openTransactionId" @onRecordUpdate="onTransactionUpdate" />
        </div>
      </div>
    </SidePanel>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { getFirstDayMonthWithString, getLastDayMonthWithString } from '~/plugins/date-helpers'
import { QUERY_TRANSACTIONS, QUERY_TRANSACTIONS_WITH_FILTERS } from '~/graphql'
import { apolloClient } from '~/plugins/apollo-client'
import CloseIcon from '~/components/icon/CloseIcon.vue'
import SidePanel from '~/components/layout/SidePanel.vue'
import TransactionFilters from '~/components/transaction/TransactionFilters.vue'
import TransactionTable from '~/components/transaction/TransactionTable.vue'
import TransactionDetail from '~/components/transaction/TransactionDetail.vue'
import { useRoute } from 'vue2-helpers/vue-router'

const transactions = ref([])
const banks = ref([])
const accounts = ref([])
const loading = ref(true)
let cursor = null
let filters = {}
const sortField = ref('date')
const sortOrder = ref('desc')

const recordModalActive = ref(false)

onMounted(() => {
  load(true)
  if (route.params.id) {
    recordModalActive.value = !!route?.params?.id
  }
})

const route = useRoute()
watch(
  () => route,
  (_current, _previous) => {
    recordModalActive.value = !!_current?.params?.id
  },
  {
    deep: true
  }
)

const load = (loadFilters) => {
  loading.value = true
  const _filters = filters.value
  apolloClient.query(
    {
      query: loadFilters ? QUERY_TRANSACTIONS_WITH_FILTERS : QUERY_TRANSACTIONS,
      variables: {
        orderBy: {
          field: sortField.value,
          sortOrder: sortOrder.value
        },
        pagination: {
          take: 50,
          cursor
        },
        filter: {
          textSearch: _filters?.text ?? null,
          bankId: _filters?.bankId ?? null,
          accountId: _filters?.accountId ?? null,
          startingDate: _filters?.startingDate ? getFirstDayMonthWithString(_filters?.startingDate) + '.000Z' : null,
          endingDate: _filters?.endingDate ? getLastDayMonthWithString(_filters?.endingDate) + '.000Z' : null,
        }
      }
    })
    .then((response) => {
      if (loadFilters) {
        banks.value = response.data.banks
        accounts.value = response.data.accounts
      }
      const _transactions = response.data.transactions;
      transactions.value = transactions.value.concat(_transactions)
      cursor = _transactions[_transactions.length - 1]?.id
      loading.value = false
    })
}

function reload() {
  transactions.value = []
  cursor = null;
  document.getElementById('transaction-table-container').scrollTop = 0
  load(false)
}

function onChangeFilters(_filters) {
  filters.value = _filters
  reload()
}

function onSort(field) {
  sortOrder.value = sortField.value === field && sortOrder.value === 'asc' ? 'desc' : 'asc'
  sortField.value = field
  reload()
}

const openTransactionId = computed(() => {
  return route.params?.id ?? ''
})

function onTransactionUpdate(transaction) {
  const index = transactions.value.findIndex(t => t.id === transaction.id)
  if (index >= 0) transactions.value.splice(index, 1, transaction)
}

const onScroll = ({ target: { scrollTop, clientHeight, scrollHeight } }) => {
  if (scrollTop + clientHeight >= scrollHeight) {
    load(false)
  }
}
</script>
