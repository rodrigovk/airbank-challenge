<template>
  <div class="">
    <div class="flex flex-row flex-wrap gap-4">
      <TextInput label="Search" v-model="filters.text" placeholder="Search by bank, account, category, date, amount, currency..." 
        :disabled="loading" @change="onChangeText" class="grow-[10] shrink w-96" 
      />
      <SelectInput label="Bank" v-model="filters.bankId" placeholder="No filter applied" :disabled="loading" @change="onChangeBank" class="grow w-48">
        <option value="">
          None
        </option>
        <option v-for="bank in banks" :key="bank.id" :value="bank.id">
          {{ bank.name }}
        </option>
      </SelectInput>
      <SelectInput label="Account" v-model="filters.accountId" placeholder="No filter applied" :disabled="loading" @change="onChangeAccount" class="grow w-48">
        <option value="">
          None
        </option>
        <option v-for="account in accounts" :key="account.id" :value="account.id">
          {{ account.name }}
        </option>
      </SelectInput>
      <MonthInput label="Starting date" v-model="filters.startingDate" :disabled="loading" @change="onChangeStartingDate" />
      <MonthInput label="Ending date" v-model="filters.endingDate" :disabled="loading" @change="onChangeEndingDate" />
    </div>
  </div>
</template>

<script setup>
import TextInput from '../layout/TextInput.vue'
import SelectInput from '../layout/SelectInput.vue'
import MonthInput from '../layout/MonthInput.vue'

const props = defineProps({
  banks: {
    type: Array,
    required: true
  },
  accounts: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    required: true
  },
})

const filters = {
  text: '',
  bankId: '',
  accountId: '',
  startingDate: '',
  endingDate: '',
}

const emit = defineEmits(['reload', 'onChangeFilters'])

async function onChangeText(event) {
  //filters.text = event.target.value
  emit('onChangeFilters', filters)
}

async function onChangeBank(event) {
  // filters.bankId = event.target.value
  emit('onChangeFilters', filters)
}

async function onChangeAccount(event) {
  // filters.accountId = event.target.value
  emit('onChangeFilters', filters)
}

async function onChangeStartingDate(event) {
  //filters.startingDate = event.target.value
  emit('onChangeFilters', filters)
}

async function onChangeEndingDate(event) {
  // filters.endingDate = event.target.value
  emit('onChangeFilters', filters)
}
</script>
