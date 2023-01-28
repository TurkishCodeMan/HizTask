<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useTicketStore } from "../stores/ticket";
import { storeToRefs } from "pinia";
import { client } from "@/utils/api";
import type { Seat } from "@/utils/interfaces";
import { useRouter } from "vue-router";
import { notify } from "@kyvg/vue3-notification";

const { eventId, eventCategoryId, selectedSeats } = storeToRefs(
  useTicketStore()
);
console.log(eventCategoryId, eventId, selectedSeats);
const router = useRouter();
const user = reactive({
  customer_name: "",
  customer_surname: "",
  customer_email: "",
  cc_number: "",
  cc_exp_month: 0,
  cc_exp_year: 0,
  cc_exp_cvv: 0,
});

function submitForm() {
  return client(`payment`, {
    data: {
      customer_name: user.customer_name,
      customer_surname: user.customer_surname,
      customer_email: user.customer_email,
      cc_number: user.cc_number,
      cc_exp_month: +user.cc_exp_month,
      cc_exp_year: +user.cc_exp_year,
      cc_exp_cvv: +user.cc_exp_cvv,
      eventCategoryId: eventCategoryId.value,
      eventId: eventId.value,
      seats: selectedSeats.value.map((val: Seat) => val.id),
    },
  })
    .then((data) => {
      notify({
        title: "Success",
        text: "Successing Reservation.",
        type: "success",
      });
      router.push("/");
    })
    .catch((err) => {
      notify({
        title: "Error",
        text: err?.error?.message,
        type: "warn",
      });
    });
}
</script>

<template>
  <section class="mt-5 flex justify-between">
    <div class="max-w-xl flex-1">
      <div class="mb-8">
        <h1 class="text-2xl font-bold">Pricing</h1>
      </div>
      <form @submit.prevent="submitForm" class="flex flex-col gap-4">
        <label for="customer_name" class="flex flex-col">
          Customer name
          <input
            class="border-2 py-1 rounded-md"
            type="text"
            required
            v-model="user.customer_name"
          />
        </label>
        <label for="customer_name" class="flex flex-col">
          Customer surname
          <input
            class="border-2 py-1 rounded-md"
            type="text"
            required
            v-model="user.customer_surname"
          />
        </label>
        <label for="customer_name" class="flex flex-col">
          Customer email
          <input
            class="border-2 py-1 rounded-md"
            type="text"
            required
            v-model="user.customer_email"
          />
        </label>
        <label for="customer_name" class="flex flex-col">
          CC number
          <input
            class="border-2 py-1 rounded-md"
            type="text"
            required
            v-model="user.cc_number"
          />
        </label>
        <label for="customer_name" class="flex flex-col">
          CC Exp Month
          <input
            class="border-2 py-1 rounded-md"
            type="text"
            required
            v-model="user.cc_exp_month"
          />
        </label>
        <label for="customer_name" class="flex flex-col">
          CC Exp Year
          <input
            class="border-2 py-1 rounded-md"
            type="text"
            required
            v-model="user.cc_exp_year"
          />
        </label>
        <label for="customer_name" class="flex flex-col">
          CC Exp CVV
          <input
            class="border-2 py-1 rounded-md"
            type="text"
            required
            v-model="user.cc_exp_cvv"
          />
        </label>

        <button
          type="submit"
          class="mb-10 mt-8 hover:scale-110 transition-all ease-linear text-white bg-blue-400 rounded-md px-8 py-4"
        >
          Submit
        </button>
      </form>
    </div>
  </section>
</template>
