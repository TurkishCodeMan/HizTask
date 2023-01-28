<script setup lang="ts">
import { useEvents } from "@/utils/events";
import { ref, isRef, computed } from "vue";
import { format, formatRelative } from "date-fns";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useTicketStore } from "@/stores/ticket";
import type { Event } from "@/utils/interfaces";
import EventComponent from "@/components/EventComponent.vue";

const { data, isSuccess, isError, isLoading } = useEvents();
const router = useRouter();
const items = computed(() => data.value);

const { eventId } = storeToRefs(useTicketStore());

function submit(item: Event) {
  eventId.value = +item.id;
  router.push(`/event/${item.id}`);
}
</script>

<template>
  <main class="mt-5">
    <div v-if="isSuccess" class="flex flex-col gap-8">
      <table class="table-auto">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Venue</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <EventComponent :items="(items as Event[])" :submit="submit" />
        </tbody>
      </table>
    </div>
    <div class="" v-else-if="isLoading">
      <p>Loading....</p>
    </div>
    <div class="" v-else-if="isError">
      <p>Unhandled exception !!</p>
    </div>
  </main>
</template>
