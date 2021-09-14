<template>
    <n-date-picker v-model:value="dateProps" type="datetime" clearable size="small" />
</template>

<script setup lang="ts">
import { computed } from "@vue/runtime-core"
const emit = defineEmits(['DateUpdate'])
const props = defineProps({ date: Number, td: Object, th: Object })

const dateProps: any = computed({
  get: () => props.date,
  set: val => {
    emit('DateUpdate', { date: val, tdIdx: props?.td?.idx, thIdx: props?.th?.key})
  }
})
</script>
