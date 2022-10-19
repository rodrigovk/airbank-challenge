<template>
  <div v-if="!loading" class="flex flex-col gap-2">
    <TextInput v-model="reference" label="Reference" placeholder="" class="w-full" />
    <SelectInput v-model="accountId" label="Account" placeholder="" :disabled="loading" class="w-full">
      <option v-for="account in accounts" :key="account.id" :value="account.id">
        {{ account.name }}
      </option>
    </SelectInput>
    <div>
      <div v-if="!creatingCategory" class="flex flex-row flex-wrap gap-4 items-end">
        <SelectInput v-model="categoryId" label="Category" placeholder="" :disabled="loading" class="grow">
          <option v-for="category in categories" :key="category.id" :value="category.id"
            :style="`background-color: ${colorCodeStyle(category.color)}90`">
            {{ category.name }}
          </option>
        </SelectInput>
        <button class="h-10 px-2 py-2 bg-black text-gray-300 rounded" @click="toggleCreateCategory">New
          category</button>
      </div>
      <div v-if="creatingCategory" class="flex flex-col flex-wrap gap-4">
        <div class="flex flex-row flex-wrap gap-4 items-end">
          <TextInput v-model="newCategoryName" label="New category" placeholder="Type the new category's name"
            class="grow" />
          <button class="h-10 px-2 py-2 bg-black text-gray-300 rounded" @click="saveNewCategory">Save category</button>
        </div>
        <p v-if="newCategoryMessage" class="text-red-500">{{ newCategoryMessage }}</p>
      </div>
    </div>
    <div class="flex flex-row flex-wrap gap-4">
      <NumberInput label="Amount" v-model.number="amount" placeholder="" class="grow w-40" />
      <SelectInput label="Currency" v-model="currency" placeholder="" :disabled="loading" class="w-20">
        <option v-for="currency in currencies" :key="currency.name" :value="currency.name">
          {{ currency.name }}
        </option>
      </SelectInput>
    </div>
    <DateInput label="Date/time" v-model.Date="date" />
    <button class="mt-4 px-2 py-2 bg-black text-gray-300 rounded" @click="onUpdate">Save transaction</button>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue2-helpers/vue-router'
import { QUERY_TRANSACTION, QUERY_TRANSACTION_WITH_LOOKUPS, MUTATION_TRANSACTION_UPDATE, MUTATION_CATEGORY_CREATE } from '~/graphql'
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
const categoryColors = ['f3e7cf', 'acdcff', '7048a3', 'ffbf84', '75b970', 'ff6955', 'f6f2ab', '958e80']
const loading = ref(true)

let transaction = {}
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
      transaction = { ...response.data.transaction, date: formatDateTimeForInputs(response.data.transaction.date) }

      reference.value = transaction.reference
      accountId.value = transaction.accountId
      categoryId.value = transaction.categoryId
      amount.value = transaction.amount
      currency.value = transaction.currency
      date.value = transaction.date
      loading.value = false
    })
}

const onUpdate = () => {
  const checkFieldUpdated = (oldValue, newValue) => {
    return oldValue !== newValue ? newValue : undefined
  }

  loading.value = true
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
          date: transaction.date !== date.value ? date.value + '.000Z' : undefined
        }
      }
    })
    .then((response) => {
      loading.value = false
      onRecordUpdate(response.data.updateTransaction)
      router.push('/')
    })
}

const fullConfig = resolveConfig(tailwindConfig)

const colorCodeStyle = (colorCode) => {
  return colorCode ? `#${colorCode}` : fullConfig.theme.backgroundColor.stone[200]
}

const creatingCategory = ref(false)
const newCategoryName = ref('')
const newCategoryMessage = ref('')

const toggleCreateCategory = () => {
  creatingCategory.value = !creatingCategory.value
}

const saveNewCategory = () => {
  newCategoryMessage.value = ''
  if (newCategoryName.value === '') return newCategoryMessage.value = 'Name not informed'
  
  loading.value = true
  apolloClient.mutate(
    {
      mutation: MUTATION_CATEGORY_CREATE,
      variables: {
        data: {
          name: newCategoryName.value,
          color: categoryColors[Math.floor(Math.random() * categoryColors.length)]
        }
      }
    })
    .then((response) => {
      newCategoryName.value = ''
      const category = response.data.createCategory
      const _categories = categories.value.concat(category).sort((a, b) => a.name.localeCompare(b.name))
      categories.value = _categories
      categoryId.value = category.id
      creatingCategory.value = false
      loading.value = false
    })
}

const emit = defineEmits(['onRecordUpdate'])

const onRecordUpdate = (record) => {
  emit('onRecordUpdate', record)
}
</script>
