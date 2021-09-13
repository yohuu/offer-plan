<template>
    <div id="calendar" style="height: 800px;"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Calendar from "tui-calendar" /* ES6 */
onMounted(() => {
    new Calendar('#calendar', {
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
                return schedule.title + ' <i class="fa fa-refresh"></i>' + schedule.start;
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
        useDetailPopup: false
    });
})
</script>

<style>
@import './tui-calendar.css'; /* 引入公共样式 */
@import './tui-time-picker.css';
@import './tui-date-picker.css';
</style>
