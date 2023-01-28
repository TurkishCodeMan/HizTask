<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <notifications />
  <header class="bg-blue-400">
    <div class="px-20 py-3">
      <div class="flex items-center justify-between w-full">
        <img
          alt="Vue logo"
          class="logo"
          src="@/assets/logo.svg"
          width="50"
          height="50"
        />
        <nav class="flex gap-6 mr-5">
          <RouterLink class="font-semibold text-lg text-gray-100" to="/"
            >Events</RouterLink
          >
        </nav>
      </div>
    </div>
  </header>

  <div class="px-20">
    <RouterView />
  </div>
</template>

<style scoped></style>
