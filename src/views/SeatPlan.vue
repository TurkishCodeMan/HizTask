<script setup lang="ts">
import { useEvents, useSeatPlans } from "@/utils/events";
import { ref, watchEffect, isRef, computed } from "vue";
import { format, formatRelative } from "date-fns";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useTicketStore } from "@/stores/ticket";

const route = useRoute();
const router = useRouter();
const { eventId, categoryId } = route.params;
const { data, isSuccess, isError, isLoading } = useSeatPlans(
  eventId as string,
  categoryId as string
);
const {
  selectedSeats,
  eventCategoryId,
  eventId: eId,
} = storeToRefs(useTicketStore());
const items = computed(() => data.value);
const rows = ref<string[]>([]);

function addRows(row: string) {
  if (!rows.value.some((i) => i === row)) {
    return (rows.value = [...rows.value, row]);
  }
  return;
}

function submit(){
    eventCategoryId.value=+categoryId;
    eId.value=+eventId;
    router.push(`/pricing`)
}

watchEffect(() => {
  items.value?.forEach((val) => addRows(val.row));
});
</script>

<template>
  <section
    class="flex bg-gray-100 rounded-md p-5 flex-col mt-20 gap-1 items-start flex-wrap"
  >
    <div v-if="isLoading">Loading....</div>
    <div
      class="flex relative items-center my-8 flex-wrap gap-7"
      v-for="row in rows"
      :key="row"
    >
      <div
        class="absolute -top-12 text-right pr- right-1/2 mb-2 bg-gray-400 w-full font-bold text-lg"
      >
        {{ row }}
      </div>
      <div class="flex" :key="item.id" v-for="item in items">
        <input
          v-if="row === item.row"
          :disabled="item.isBooked"
          type="checkbox"
          :value="item"
          v-model="selectedSeats"
          class="mx-3"
        />
        <label v-if="row === item.row" for="">{{
          ` Seat  ` + item.seat
        }}</label>
      </div>
    </div>

    <button
      @click="submit"
      class="mb-10 ml-auto mt-8 hover:scale-110 transition-all ease-linear text-white bg-blue-400 rounded-md px-8 py-4"
    >
      Go to Payment
    </button>
  </section>
</template>
