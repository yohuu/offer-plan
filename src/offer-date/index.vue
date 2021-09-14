<template>
<n-alert title="提示" type="warning">
    本页所有数据均保存在浏览器的缓存中，清除浏览器缓存后计划将不被保存，清空缓存前记得截图保存！
</n-alert>
  <n-table :bordered="false" :single-line="false">
    <thead>
      <tr>
        <th v-for="th in theaderData">{{th.label}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="td in tbody.tbodyData">
        <td v-for="th in theaderData">
          <n-input
            v-if="th.key === 'Company'"
            v-model:value="td[th.key]"
            type="text"
            size="small"
            placeholder="输入公司名称"
            round />
          <v-date-th
            v-else-if="th.textState === 'W'"
            :date.sync="td[th.key]"
            :td="td"
            :th="th"
            @DateUpdate="updateDate"
          ></v-date-th>
          <n-button
            v-else-if="th.textState === 'E'"
            @click="delOneCompany(td.idx)"
            type="error"
            dashed
            size="tiny"
            >删除</n-button>
          <span v-else> -- </span>
        </td>
      </tr>
    </tbody>
  </n-table>
  <n-button @click="addOneCompany" type="primary" class="add-new-company" ghost>添加新公司</n-button>
  <v-calendar :schedules="tbody.tbodyData" :schedules-frame="theaderData"/>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import VDateTh from './components/date-th.vue'
import VCalendar from './components/calendar.vue'

const theaderData: any[] = [
  {
    key: 'Company',
    label: '公司',
    visible: true,
    textState: 'R'
  },
  {
    key: 'ResumeDelivery',
    label: '简历开始投递',
    visible: true,
    textState: 'W'
  },
  {
    key: 'WrittenExamination',
    label: '笔试',
    visible: true,
    textState: 'W'
  },
  {
    key: 'Interview',
    label: '面试',
    visible: true,
    textState: 'W'
  },
  {
    key: 'EditCell',
    label: '操作项',
    visible: true,
    textState: 'E'
  }
]
// tbody 相关操作
let localTbodyData: any[] = []
try {
  localTbodyData = JSON.parse(localStorage.getItem('offer_plan_date') || '') || localTbodyData
} catch (err) {
  localTbodyData = []
}
let tbody: any = reactive({ tbodyData: localTbodyData })
watch(
  tbody,
  (newValue: any) => {
    localStorage.setItem('offer_plan_date', JSON.stringify(newValue.tbodyData))
  },
  { deep: true }
)
const updateDate = (val: any) => {
  tbody.tbodyData.forEach((item: any) => {
    if (item.idx === val.tdIdx) item[val.thIdx] = val.date
  })
}
const addOneCompany = () => {
  const defaultTbodyData = {
    idx: tbody.tbodyData.length ? tbody.tbodyData[tbody.tbodyData.length-1].idx + 1 : 0,
    Company: 'mt',
    ResumeDelivery: 1631448353000,
    WrittenExamination: 1631448363000,
    Interview: 1631448373000
  }
  tbody.tbodyData.push(defaultTbodyData)
}
const delOneCompany = (tdIdx: any) => {
  tbody.tbodyData = tbody.tbodyData.filter((item: any) => {
    return tdIdx !== item.idx
  })
}
</script>

<style>
.add-new-company {
    margin: 10px 0;
}
</style>
