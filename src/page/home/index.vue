<script setup>
import { getCalendar } from '../../api/calendar'
import { onMounted, ref } from 'vue'

const calendarData = ref([])

const getCalendarData = async () => {
  const res = await getCalendar()
  calendarData.value = res
}

onMounted(() => {
  getCalendarData()
})
</script>

<template>
  <div class="w-full h-full p-20">
    <div class="grid grid-cols-7 gap-1 h-full">

      <div
        v-for="day in calendarData"
        :key="day.weekday.id"
        class=" flex flex-col items-center justify-start rounded"
      >
        <div class="font-bold text-black py-2">{{ day.weekday.cn }}</div>
        <!-- 表体 -->
        <div class="flex flex-col items-center gap-2">
          <div v-for="item in day.items" :key="item.id" class="relative w-36 h-60 hover:scale-105 transition-all duration-300 cursor-pointer">
            <img
              :src="item.images?.large"
              alt="cover"
              class="rounded  w-full h-full object-cover"
              style="background: none;"
            />
            <div class="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-xs text-center py-1 rounded-b">
              {{ item.name_cn || item.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>