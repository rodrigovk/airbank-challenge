<template>
  <div class="">
    <div class="flex flex-row flex-wrap gap-4">
      <TextInput label="Search" :value="filterText" placeholder="Search by bank, account, category, date, amount, currency..." class="w-96" />
      <SelectInput label="Bank" initialvalue="" placeholder="No filter applied" class="w-48">
        <option value="teste1">
          Teste 1
        </option>
        <option value="teste2">
          Teste 2
        </option>
      </SelectInput>
      <SelectInput label="Account" initialvalue="" placeholder="No filter applied" class="w-48">
        <option value="teste1">
          Teste 1
        </option>
        <option value="teste2">
          Teste 2
        </option>
      </SelectInput>
      <MonthInput label="Starting date" value="" />
      <MonthInput label="Ending date" value="" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TextInput from '../layout/TextInput.vue'
import SelectInput from '../layout/SelectInput.vue'
import MonthInput from '../layout/MonthInput.vue'

const filterText = ref('teste')
</script>
