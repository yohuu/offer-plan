<template>
    <div id="calendar-wrap">
        <n-button @click="prevDate">上一月</n-button>
        <n-button @click="nextDate">下一月</n-button>
        <span class="current-date">{{ currentDate }}</span>
        <div id="calendar" style="height: 800px;"></div>
    </div>
</template>

<script setup lang="ts">
import moment from 'moment'
import { onMounted, watchEffect, ref } from 'vue'
import Calendar from "tui-calendar" /* ES6 */
// 父级数据
const props = defineProps({ schedules: Array, schedulesFrame: Array })
// 帮助map，用于展示文案
const schedulesFrameMap: any = {}
props.schedulesFrame?.forEach((element: any) => {
    schedulesFrameMap[element.key] = element.label
});
// 日历实例
let calendar: any = undefined

// 行程数据
let schedules: any[] = []
watchEffect(() => {
    schedules = []
    props.schedules?.forEach((item: any, index: number) => {
        if (item) {
            Object.keys(item).forEach((key) => {
                if (key !== 'Company' && key !== 'idx') {
                    const startTime = new Date(item[key] + 1000*60*60*8)
                    const endTime = new Date(item[key] + 1000*60*60*8 + 1000*60*60*2)
                    const timeTitle = startTime.toJSON().split('T')[1].split('.')[0]
                    const tempSchedule = {
                        id: `${item.idx}_${key}_${index}`,
                        calendarId: `${item.idx}_${key}_${index}`,
                        title: `${item.Company}-${schedulesFrameMap[key]}-${timeTitle}`,
                        category: 'time',
                        dueDateClass: '',
                        start: startTime.toJSON(),
                        end: endTime.toJSON(),
                        color: '#ffffff',
                        bgColor: '#9e5fff',
                        dragBgColor: '#9e5fff',
                        borderColor: '#9e5fff'
                    }
                    schedules.push(tempSchedule)
                }
            })
        }
    })
    if (calendar) {
        calendar.clear(true)
        calendar.createSchedules(schedules)
        calendar.render()
    }
})
// 当前月分
let currentDate = ref('')
// 挂载日历到dom节点
onMounted(() => {
    calendar = new Calendar('#calendar', {
        // 'day', 'week', 'month'
        defaultView: 'month',

        // shows the milestone and task in weekly, daily view
        // taskView: true,

        // shows the all day and time grid in weekly, daily view
        scheduleView: true,

        // template options
        template: {
            milestone: function(schedule) {
                return '<span style="color:red;"><i class="fa fa-flag"></i> ' + schedule.title + '</span>';
            },
            milestoneTitle: function() {
                return 'Milestone';
            },
            task: function(schedule) {
                return '&nbsp;&nbsp;#' + schedule.title;
            },
            taskTitle: function() {
                return '<label><input type="checkbox" />Task</label>';
            },
            allday: function(schedule) {
                return schedule.title + ' <i class="fa fa-refresh"></i>';
            },
            alldayTitle: function() {
                return 'All Day';
            },
            time: function(schedule) {
                return schedule.title + ' <i class="fa fa-refresh"></i>';
            }
        },
        week: {
            daynames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            startDayOfWeek: 0,
            narrowWeekend: true
        },
        month: {
            daynames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            startDayOfWeek: 0,
            narrowWeekend: true
        },

        // list of Calendars that can be used to add new schedule
        calendars: [],

        // whether use default creation popup or not
        useCreationPopup: false,

        // whether use default detail popup or not
        useDetailPopup: false,
        timezone: {
            zones: [
                {
                    timezoneName: 'Asia/Seoul',
                    displayLabel: 'GMT+09:00',
                    tooltip: 'Seoul'
                },
                {
                    timezoneName: 'America/New_York',
                    displayLabel: 'GMT-05:00',
                    tooltip: 'New York',
                }
            ],
            offsetCalculator: function(timezoneName, timestamp){
                // matches 'getTimezoneOffset()' of Date API
                // e.g. +09:00 => -540, -04:00 => 240
                return moment.parseZone(timestamp).utcOffset();
            },
        }
    })
    calendar.clear(true)
    calendar.createSchedules(schedules)
    calendar.render()
    setCurrentDate()
})
const setCurrentDate = () => {
    const temp = moment([calendar.getDate().getFullYear(), calendar.getDate().getMonth(), calendar.getDate().getDate()]);
    currentDate.value = temp.format('YYYY.MM')
}
// dom 事件
const prevDate = () => {
    calendar.prev()
    setCurrentDate()
}
const nextDate = () => {
    calendar.next()
    setCurrentDate()
}
</script>

<style>
@import './tui-calendar.css'; /* 引入公共样式 */
@import './tui-time-picker.css';
@import './tui-date-picker.css';
</style>
