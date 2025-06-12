<template>
  <div class="mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row -mx-4">
      <div class="md:w-1/4 px-4 mb-4">
        <CustomerMenu />
      </div>
      <div class="md:w-3/4 px-4 mb-4">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h5 class="font-bold text-xl mb-4">
            <font-awesome-icon :icon="['fas', 'shopping-cart']" /> <span class="ml-2">DETAIL ORDER</span>
          </h5>
          <hr class="mb-4" />
          <table class="min-w-full bg-white border border-gray-200">
            <tbody>
              <tr>
                <td class="py-2 px-4 w-1/4">NO. INVOICE</td>
                <td class="py-2 px-4 w-1%">:</td>
                <td class="py-2 px-4">
                  {{ (detailOrder as any).invoice }}
                </td>
              </tr>
              <tr>
                <td class="py-2 px-4">NAMA LENGKAP</td>
                <td class="py-2 px-4">:</td>
                <td class="py-2 px-4">
                  {{ (detailOrder as any).name }}
                </td>
              </tr>
              <tr>
                <td class="py-2 px-4">NO. TELP / WA</td>
                <td class="py-2 px-4">:</td>
                <td class="py-2 px-4">
                  {{ (detailOrder as any).phone }}
                </td>
              </tr>
              <tr>
                <td class="py-2 px-4">KURIR / SERVICE / COST</td>
                <td class="py-2 px-4">:</td>
                <td class="py-2 px-4">
                  {{ (detailOrder as any).courier }} / {{ (detailOrder as any).service }} / Rp.
                  {{ moneyFormat((detailOrder as any).cost_courier) }}
                </td>
              </tr>
              <tr>
                <td class="py-2 px-4">ALAMAT LENGKAP</td>
                <td class="py-2 px-4">:</td>
                <td class="py-2 px-4">
                  {{ (detailOrder as any).address }}
                </td>
              </tr>
              <tr>
                <td class="py-2 px-4">TOTAL PEMBELIAN</td>
                <td class="py-2 px-4">:</td>
                <td class="py-2 px-4">{{ moneyFormat((detailOrder as any).grand_total) }}</td>
              </tr>
              <tr>
                <td class="py-2 px-4">STATUS</td>
                <td class="py-2 px-4">:</td>
                <td class="py-2 px-4">
                  <button @click="payment((detailOrder as any).snap_token)"
                    v-if="(detailOrder as any).status == 'pending'"
                    class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-sm">
                    BAYAR SEKARANG
                  </button>
                  <button v-else-if="(detailOrder as any).status == 'success'"
                    class="bg-green-500 text-white font-bold py-2 px-4 rounded text-sm">
                    {{ (detailOrder as any).status }}
                  </button>
                  <button v-else-if="(detailOrder as any).status == 'expired'"
                    class="bg-yellow-500 text-white font-bold py-2 px-4 rounded text-sm">
                    {{ (detailOrder as any).status }}
                  </button>
                  <button v-else-if="(detailOrder as any).status == 'failed'"
                    class="bg-red-500 text-white font-bold py-2 px-4 rounded text-sm">
                    {{ (detailOrder as any).status }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 mt-4">
          <h5 class="font-bold text-xl mb-4"><font-awesome-icon :icon="['fas', 'shopping-cart']" /> <span
              class="ml-2">DETAIL ORDER</span></h5>
          <hr class="mb-4" />
          <table class="min-w-full bg-white border border-gray-200">
            <tbody>
              <tr v-for="product in productInOrder" :key="(product as any).id"
                class="bg-gray-100 border-b border-gray-200">
                <td class="py-3 px-4 w-1/4">
                  <div class="w-full">
                    <img :src="(product as any).image" class="w-full rounded-lg" />
                  </div>
                </td>
                <td class="py-3 px-4 w-1/2">
                  <h5 class="font-bold text-lg mb-2">{{ (product as any).product_name }}</h5>
                  <table class="text-sm">
                    <tr>
                      <td class="pr-2">QTY</td>
                      <td class="pr-2">:</td>
                      <td>
                        <b class="font-bold">{{ (product as any).qty }}</b>
                      </td>
                    </tr>
                  </table>
                </td>
                <td class="py-3 px-4 text-right">
                  <p class="m-0 font-bold">
                    {{ moneyFormat((product as any).price) }}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomerMenu from "../../components/CustomerMenu.vue";
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useOrderStore } from "../../stores/order";
import { useUtils } from "../../composables/useUtils";

const route = useRoute();
const router = useRouter();
const orderStore = useOrderStore();
const { moneyFormat } = useUtils();

onMounted(() => {
  orderStore.detailOrderAction(route.params.snap_token as string);
});

const detailOrder = computed(() => {
  return orderStore.getDetailOrder;
});

const productInOrder = computed(() => {
  return orderStore.getProductInOrder;
});

function payment(snap_token: string) {
  (window as any).snap.pay(snap_token, {
    onSuccess: function () {
      router.push({ name: "detail_order", params: { snap_token: snap_token } });
    },
    onPending: function () {
      router.push({ name: "detail_order", params: { snap_token: snap_token } });
    },
    onError: function () {
      router.push({ name: "detail_order", params: { snap_token: snap_token } });
    },
  });
}
</script>

<style scoped>
/* No more scoped styles, all handled by Tailwind */
</style>
