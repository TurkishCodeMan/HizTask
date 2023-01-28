<script setup lang="ts">
import type { Event } from "@/utils/interfaces";
import { format, formatRelative } from "date-fns";

const { items, submit } = defineProps<{
  items: Event[];
  submit: (item: Event) => void;
}>();

</script>

<template>
  <tr
    v-for="item in items"
    :key="item.id"
    @click="() => submit(item)"
    class="bg-gray-200 mb-2 hover:bg-gray-300 transition-all rounded-sm"
  >
    <td>
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
</template>
