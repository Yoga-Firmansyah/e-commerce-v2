<template>
  <div class="mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row -mx-4">
      <div class="md:w-1/4 px-4 mb-4">
        <CustomerMenu />
      </div>
      <div class="md:w-3/4 px-4 mb-4">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h5 class="font-bold text-xl mb-4">
            <font-awesome-icon :icon="['fas', 'shopping-cart']" /> <span class="ml-2">MY ORDER</span>
          </h5>
          <hr class="mb-4" />
          <div class="overflow-x-auto">
            <table class="min-w-full bg-white border border-gray-200">
              <thead class="bg-gray-800 text-white">
                <tr>
                  <th class="py-3 px-4 text-left">INVOICE</th>
                  <th class="py-3 px-4 text-left">FULL NAME</th>
                  <th class="py-3 px-4 text-left">SHIPPING</th>
                  <th class="py-3 px-4 text-left">GRAND TOTAL</th>
                  <th class="py-3 px-4 text-center">OPTIONS</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="order in orders" :key="(order as any).id" class="border-b border-gray-200">
                  <td class="py-3 px-4">{{ (order as any).invoice }}</td>
                  <td class="py-3 px-4">{{ (order as any).name }}</td>
                  <td class="py-3 px-4">
                    {{ (order as any).courier.toUpperCase() }} | {{ (order as any).service }} |
                    {{ moneyFormat((order as any).cost_courier) }}
                  </td>
                  <td class="py-3 px-4">{{ moneyFormat((order as any).grand_total) }}</td>
                  <td class="py-3 px-4 text-center">
                    <router-link :to="{
                      name: 'detail_order',
                      params: { snap_token: (order as any).snap_token },
                    }"
                      class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-sm">DETAIL</router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomerMenu from "../../components/CustomerMenu.vue";
import { computed, onMounted } from "vue";
import { useOrderStore } from "../../stores/order";
import { useUtils } from "../../composables/useUtils";

const orderStore = useOrderStore();
const { moneyFormat } = useUtils();

onMounted(() => {
  orderStore.getOrder();
});

const orders = computed(() => {
  return orderStore.getOrders;
});
</script>

<style scoped>
/* No more scoped styles, all handled by Tailwind */
</style>
