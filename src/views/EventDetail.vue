<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useSingleEvent } from "@/utils/events";
import { computed, ref } from "vue";
import { format, formatRelative } from "date-fns";
import { storeToRefs } from "pinia";
import { useTicketStore } from "@/stores/ticket";
import type { EventCategory } from "@/utils/interfaces";

const route = useRoute();
const { id } = route.params;
const { url } = route.query;
const router = useRouter();

const { data, isLoading, isSuccess } = useSingleEvent(id as string);
const event = computed(() => data.value);

const selectedCategoryId = ref([]);
const { eventCategoryId } = storeToRefs(useTicketStore());

function submit() {
  eventCategoryId.value = +selectedCategoryId.value[0];
  router.push(`/seat-plans/${id}/${selectedCategoryId.value[0]}`);
}
</script>

<template>
  <section class="event-detail">
    <article class="py-12" v-if="isSuccess">
      <header>
        <h1 class="font-bold text-2xl mb-3">{{ event?.title }}</h1>
        <img
          class="rounded-md"
          :src="(url as string)"
          :alt="event?.description"
        />
      </header>
      <div>
        <address>
          <p>{{ event?.venue.name }}</p>
          <br />
          <p>{{ event?.venue.address }}</p>
          <br />
        </address>
        <p>Date: {{ new Date(event?.event_date as string).getUTCDate() }}</p>
      </div>

      <div class="my-3">
        <p class="font-semibold">{{ event?.description }}</p>
      </div>

      <h3 class="mb-4 font-semibold text-gray-900">Category</h3>
      <ul
        v-for="category in event?.event_categories"
        :key="category.id"
        class="w-full text-lg font-medium text-gray-900 border border-gray-200 rounded-lg px-2"
      >
        <li
          :key="category.id"
          class="w-full border-b border-gray-200 rounded-t-lg py-2 my-2"
        >
          <div class="flex items-center pl-3 my-3">
            <input
              :id="String(category.id)"
              type="checkbox"
              :value="category.id"
              v-model="selectedCategoryId"
              class="text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-2"
            />
            <label
              for="vue-checkbox"
              class="w-full py-3 ml-2 text-xl font-medium text-gray-900"
              >{{ category.name }}</label
            >
            <label class="text-2xl font-bold" for="">{{ category.price + `TL` }}</label>
          </div>
        </li>
      </ul>
      <button
        @click="submit"
        class="mb-10 w-1/3 mt-8 hover:scale-110 transition-all ease-linear text-white bg-blue-400 rounded-md px-8 py-4"
      >
        Go Seat Plan
      </button>
    </article>

    <div v-if="isLoading"><p>Loading....</p></div>
  </section>
</template>

<style></style>
