<script setup lang="ts">
import { useEvents } from "@/utils/events";
import { ref, isRef, computed } from "vue";
import { format, formatRelative } from "date-fns";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useTicketStore } from "@/stores/ticket";
import type { Event } from "@/utils/interfaces";
const { data, isSuccess,isError,isLoading } = useEvents();
const router=useRouter()
const items = computed(() => data.value);

const { eventId } = storeToRefs(useTicketStore());


function submit(item:Event){
  eventId.value=+item.id;
  router.push(`/event/${item.id}?url=${item.image_url}`)
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
          <tr
           
            v-for="item in items"
            :key="item.id"
            @click="()=>submit(item)"
            class="bg-gray-200 mb-2 hover:bg-gray-300 transition-all rounded-sm"
          >
            <td >
              <img
                class="rounded-md"
                :src="item.image_url"
                :alt="item.description"
                width="300"
              />
            </td>
            <td>{{ item.title }}</td>
            <td>{{ item.venue.name }}</td>
            <td>
              {{ (formatRelative(new Date(), 3), new Date(item.event_date.trim())) }}
            </td>
          </tr>
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
