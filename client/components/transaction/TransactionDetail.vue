<template>
  <div v-if="!loading" class="flex flex-col">
    <TextInput label="Reference" v-model="reference" placeholder="" class="w-full" />
    <SelectInput label="Account" v-model="accountId" placeholder="" :disabled="loading" class="w-full">
        <option v-for="account in accounts" :key="account.id" :value="account.id">
          {{ account.name }}
        </option>
      </SelectInput>
    <SelectInput label="Category" v-model="categoryId" placeholder="" :disabled="loading" class="w-full">
      <option v-for="category in categories" :key="category.id" :value="category.id" :style="`background-color: ${colorCodeStyle(category.color)}90`">
          {{ category.name }}
        </option>
    </SelectInput>
    <div class="flex flex-row flex-wrap gap-4">
      <NumberInput label="Amount" v-model.number="amount" placeholder="" class="grow w-40" />
      <SelectInput label="Currency" v-model="currency" placeholder="" :disabled="loading" class="w-20">
        <option v-for="currency in currencies" :key="currency.name" :value="currency.name">
            {{ currency.name }}
          </option>
      </SelectInput>
    </div>
    <DateInput label="Date/time" v-model.Date="date" />
    <button class="mt-4 py-2 bg-black text-gray-300 rounded" @click="onUpdate">Save transaction</button>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue2-helpers/vue-router'
import { QUERY_TRANSACTION, QUERY_TRANSACTION_WITH_LOOKUPS, MUTATION_TRANSACTION_UPDATE } from '~/graphql'
import { apolloClient } from '~/plugins/apollo-client'
import { formatDateTimeForInputs } from '~/plugins/date-helpers'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '~/tailwind.config'
import TextInput from '../layout/TextInput.vue'
import NumberInput from '../layout/NumberInput.vue'
import SelectInput from '../layout/SelectInput.vue'
import DateInput from '../layout/DateInput.vue'

const props = defineProps({
  transactionId: {
    type: String,
    required: true
  }
})

const router = useRouter()

const accounts = ref([])
const categories = ref([])
const currencies = ref([{ name: 'EUR' }, { name: 'GBP' }])
const loading = ref(true)

let transaction = {};
const reference = ref('')
const accountId = ref('')
const categoryId = ref('')
const amount = ref(0)
const currency = ref('')
const date = ref('')

onMounted(() => {
  load(true)
})

const load = (loadLookups) => {
  loading.value = true
  apolloClient.query(
    {
      query: loadLookups ? QUERY_TRANSACTION_WITH_LOOKUPS : QUERY_TRANSACTION,
      variables: {
        transactionId: props.transactionId
      }
    })
    .then((response) => {
      if (loadLookups) {
        accounts.value = response.data.accounts
        categories.value = response.data.categories
      }
      const transaction = response.data.transaction
      reference.value = transaction.reference
      accountId.value = transaction.accountId
      categoryId.value = transaction.categoryId
      amount.value = transaction.amount
      currency.value = transaction.currency
      date.value = formatDateTimeForInputs(transaction.date)
      loading.value = false
    })
}

const onUpdate = () => {
  const checkFieldUpdated = (oldValue, newValue) => {
    return oldValue !== newValue ? newValue : null
  }

  loading.value = true
  console.log(date.value)
  apolloClient.mutate(
    {
      mutation: MUTATION_TRANSACTION_UPDATE,
      variables: {
        transactionId: props.transactionId,
        data: {
          reference: checkFieldUpdated(transaction.reference, reference.value),
          accountId: checkFieldUpdated(transaction.accountId, accountId.value),
          categoryId: checkFieldUpdated(transaction.categoryId, categoryId.value),
          amount: checkFieldUpdated(transaction.amount, amount.value),
          currency: checkFieldUpdated(transaction.currency, currency.value),
          date: checkFieldUpdated(transaction.date, date.value)
        }
      }
    })
    .then((response) => {
      loading.value = false
      onRecordUpdate(response.data.updateTransaction)
      router.push('/')
    })
    .catch((err) => {
      console.log(err)
    })
}

const fullConfig = resolveConfig(tailwindConfig)

const colorCodeStyle = (colorCode) => {
  return colorCode ? `#${colorCode}` : fullConfig.theme.backgroundColor.stone[200]
}

const emit = defineEmits(['onRecordUpdate'])

const onRecordUpdate = (record) => {
  emit('onRecordUpdate', record)
}
</script>
