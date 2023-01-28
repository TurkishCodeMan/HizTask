import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTicketStore = defineStore('ticket', () => {
  const eventId = ref(0)
  const eventCategoryId = ref(0)

  const selectedSeats = ref([])

  return { eventCategoryId,eventId,selectedSeats }
})
