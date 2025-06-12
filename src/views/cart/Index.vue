<template>
  <div class="mx-auto p-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-100 to-gray-200">
    <div class="flex flex-wrap -mx-4">
      <div class="w-full md:w-1/2 px-4 mb-4 md:mb-0">
        <div class="bg-white border-0 shadow-lg rounded-lg">
          <div class="p-5 ">
            <h5 class="text-lg font-semibold mb-4"><font-awesome-icon :icon="['fa', 'shopping-cart']" /> <span
                class="ml-2">DETAIL PESANAN</span></h5>
            <hr class="my-4" />
            <div class="overflow-x-auto">
              <table class="w-full text-sm sm:text-lg md:text-2xl text-left text-gray-500">
                <tbody>
                  <tr v-for="cart in carts" :key="cart.id" class="bg-gray-100 border-b">
                    <td class="py-2 px-2 md:py-4 md:px-6" width="25%">
                      <div class="w-20 h-20 overflow-hidden rounded-md">
                        <img :src="cart.product.image" class="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td class="py-2 px-2 md:py-4 md:px-6 overflow-hidden text-ellipsis" width="50%">
                      <h5 class="font-bold text-gray-900">{{ cart.product.title }}</h5>
                      <div class="text-gray-600 mt-1">
                        <span>QTY : </span>
                        <span class="font-semibold">{{ cart.quantity }}</span>
                      </div>
                    </td>
                    <td class="py-2 px-2 text-right md:py-4 md:px-6">
                      <p class="m-0 font-bold text-gray-900">{{ moneyFormat(cart.price) }}</p>

                      <p class="m-0 text-gray-500">
                        <s class="text-red-500">{{ moneyFormat(cart.product.price * cart.quantity) }}</s>
                      </p>

                      <div class="text-right mt-2">
                        <button @click.prevent="removeCart(cart.id)" class="text-red-500 hover:text-red-700 ">
                          <font-awesome-icon :icon="['far', 'trash-can']" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <table class="w-full mt-4 text-sm sm:text-md md:text-xl">
              <tbody>
                <tr>
                  <td class="py-2 text-left" width="60%">
                    <p class="m-0 text-gray-600">JUMLAH</p>
                  </td>
                  <td class="py-2 text-right text-gray-600" width="30%">&nbsp; : </td>
                  <td class="py-2 text-right">
                    <p class="m-0 font-semibold text-gray-900 ml-2" id="subtotal">
                      {{ moneyFormat(cartTotal) }}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td class="py-2 text-left border-0">
                    <p class="m-0 text-gray-600">
                      ONGKOS KIRIM (<strong class="font-semibold">{{ cartWeight }}</strong> gram)
                    </p>
                  </td>
                  <td class="py-2 border-0 text-right text-gray-600">&nbsp; : </td>
                  <td class="py-2 border-0 text-right">
                    <p class="m-0 font-semibold text-gray-900" id="ongkir-cart">
                      {{ moneyFormat(state.courier_cost) }}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td class="py-2 text-left border-0">
                    <p class="font-bold m-0 text-lg text-gray-900 uppercase">
                      Grand Total
                    </p>
                  </td>
                  <td class="py-2 border-0 text-right text-gray-600">&nbsp; : </td>
                  <td class="py-2 border-0 text-right">
                    <p class="font-bold m-0 text-lg text-gray-900 text-right ml-2">
                      {{ moneyFormat(state.grandTotal) }}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/2 px-4">
        <div class="card border-0 shadow-lg rounded p-4 bg-white">
          <div class="card-body">
            <h5 class="text-lg font-semibold mb-4"><font-awesome-icon :icon="['fa', 'user-circle']" /> <span
                class="ml-2">RINCIAN PENGIRIMAN</span></h5>
            <hr class="my-4" />
            <div class="flex flex-wrap -mx-3">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <div class="mb-4">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="nama_lengkap">NAMA LENGKAP</label>
                  <input type="text"
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="nama_lengkap" placeholder="Nama Lengkap" v-model="state.name" />
                  <div v-if="validation.name" class="mt-2 text-red-500 text-xs italic">
                    Masukkan Nama Lengkap
                  </div>
                </div>
              </div>

              <div class="w-full md:w-1/2 px-3">
                <div class="form-group">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="phone">NO. HP /
                    WHATSAPP</label>
                  <input type="number"
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="phone" placeholder="No. HP / WhatsApp" v-model="state.phone" />
                  <div v-if="validation.phone" class="mt-2 text-red-500 text-xs italic">
                    Masukkan No. Telp
                  </div>
                </div>
              </div>

              <div class="w-full px-3 mb-6">
                <div class="form-group">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">PROVINSI</label>
                  <select
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    v-model="state.province_id" @change="getCities">
                    <option value="">-- pilih provinsi --</option>
                    <option v-for="province, index in state.provinces" :key="index" :value="province.province_id">
                      {{ province.name }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="w-full px-3 mb-6">
                <div class="form-group">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">KOTA /
                    KABUPATEN</label>
                  <select
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    v-model="state.city_id" @change="getCourier">
                    <option value="">-- pilih kota --</option>
                    <option v-for="city in state.cities" :key="(city as any).id" :value="city.city_id">
                      {{ city.name }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="w-full px-3 mb-6">
                <div class="mb-4" v-if="state.courier">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">KURIR
                    PENGIRIMAN</label>
                  <div class="flex items-center space-x-4 mt-2">
                    <input class="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" type="radio"
                      name="courier" id="ongkos_kirim-jne" value="jne" v-model="state.courier_type"
                      @change="getOngkir" />
                    <label class="ml-2 block text-sm leading-5 font-medium text-gray-700"
                      for="ongkos_kirim-jne">JNE</label>
                    <input class="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" type="radio"
                      name="courier" id="ongkos_kirim-tiki" value="tiki" v-model="state.courier_type"
                      @change="getOngkir" />
                    <label class="ml-2 block text-sm leading-5 font-medium text-gray-700"
                      for="ongkos_kirim-tiki">TIKI</label>
                    <input class="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" type="radio"
                      name="courier" id="ongkos_kirim-pos" value="pos" v-model="state.courier_type"
                      @change="getOngkir" />
                    <label class="ml-2 block text-sm leading-5 font-medium text-gray-700"
                      for="ongkos_kirim-pos">POS</label>
                  </div>
                </div>
              </div>

              <div class="w-full px-3 mb-6">
                <div class="mb-4" v-if="state.cost">
                  <hr />
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">SERVICE
                    KURIR</label>
                  <div class="flex flex-wrap -mx-3 mb-6">
                    <div v-for="value in state.costs" :key="value.service"
                      class="w-full md:w-1/3 px-3 mb-6 md:mb-0 flex items-center space-x-4 mt-2">
                      <input class="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" type="radio"
                        name="cost" :id="value.service" :value="value.cost[0].value + '|' + value.service"
                        v-model="state.costService" @change="getCostService" />
                      <label class="ml-2 block text-sm leading-5 text-gray-700" :for="value.service">
                        {{ value.service }} - {{ moneyFormat(value.cost[0].value) }}
                      </label>
                    </div>
                  </div>
                </div>

                <div class="w-full mb-6">
                  <div class="form-group">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="alamat">ALAMAT
                      LENGKAP</label>
                    <textarea
                      class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="alamat" rows="3"
                      placeholder="Perum Xxx, Jl. Candi No.36, RT 011/RW 005 (Belakang SMP ABC), Kel. Mojolangu, Kec. Lowokwaru, Kota Malang, Jawa Timur, 6514"
                      v-model="state.address"></textarea>
                    <div v-if="validation.address" class="mt-2 text-red-500 text-xs italic">
                      Masukkan Alamat Lengkap
                    </div>
                  </div>
                </div>

                <div v-if="state.buttonCheckout" class="w-full px-3 mt-6">
                  <button @click.prevent="checkout"
                    class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline">
                    CHECKOUT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, reactive, watch } from "vue";
import { useRouter } from 'vue-router';
import { useCartStore } from "@/stores/cart";
import { useAuthStore } from "@/stores/auth";
import { useUtils } from "@/composables/useUtils";
import axios from "@/interceptors/axios";

interface Province {
  province_id: string;
  name: string;
}

interface City {
  city_id: string;
  name: string;
}

interface CostDetail {
  value: number;
  etd: string;
  note: string;
}

interface Cost {
  service: string;
  description: string;
  cost: CostDetail[];
}

interface CourierService {
  code: string;
  name: string;
  costs: Cost[];
}

const cartStore = useCartStore();
const authStore = useAuthStore();
const router = useRouter();
const { moneyFormat } = useUtils();

const state = reactive({
  name: "",
  phone: "",
  address: "",
  provinces: [] as Province[],
  province_id: "",
  cities: [] as City[],
  city_id: "",
  courier: false,
  courier_type: "",
  cost: false,
  costs: [] as Cost[],
  costService: "",
  courier_cost: 0,
  courier_service: "",
  buttonCheckout: false,
  grandTotal: 0,
});

const validation = reactive({
  name: false,
  phone: false,
  address: false,
});

onMounted(async () => {
  await cartStore.fetchCartData();
  try {
    const response = await axios.get("/rajaongkir/provinces");
    state.provinces = response.data.data;
  } catch (error) {
    console.error("Error fetching provinces:", error);
  }
});

const carts = computed<any>(() => cartStore.cart);
const cartTotal = computed<number>(() => cartStore.cartTotal);
const cartWeight = computed<number>(() => cartStore.cartWeight);

async function removeCart(cartId: number) {
  await cartStore.removeCart(cartId);
  calculateGrandTotal();
}

async function getCities() {
  if (state.province_id) {
    try {
      const response = await axios.get("/rajaongkir/cities", {
        params: {
          province_id: state.province_id,
        },
      });
      state.cities = response.data.data;
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
    state.city_id = "";
    state.courier = false;
    state.cost = false;
    state.costs = [];
    state.courier_type = "";
    state.costService = "";
    state.courier_cost = 0;
    state.buttonCheckout = false;
    calculateGrandTotal();
  }
}

function getCourier() {
  if (state.city_id) {
    state.courier = true;
    state.cost = false;
    state.costs = [];
    state.courier_type = "";
    state.costService = "";
    state.courier_cost = 0;
    state.buttonCheckout = false;
    calculateGrandTotal();
  } else {
    state.courier = false;
  }
}

async function getOngkir() {
  if (!state.city_id || !state.courier_type || cartWeight.value === 0) {
    if (cartWeight.value === 0) {
      alert("Silahkan pilih produk terlebih dahulu!");
    }
    state.cost = false;
    state.costs = [];
    state.costService = "";
    state.courier_cost = 0;
    state.buttonCheckout = false;
    calculateGrandTotal();
    return;
  }

  try {
    const response = await axios.post("/rajaongkir/checkOngkir", {
      city_destination: state.city_id,
      weight: cartWeight.value,
      courier: state.courier_type,
    });
    state.cost = true;
    state.costs = response.data.data.costs;
  } catch (error) {
    console.error("Error checking ongkir:", error);
  }
  state.costService = "";
  state.courier_cost = 0;
  state.buttonCheckout = false;
  calculateGrandTotal();
}

function getCostService() {
  if (state.costService) {
    const [costStr, service] = state.costService.split('|');
    state.courier_cost = parseInt(costStr, 10);
    state.courier_service = service;
    state.buttonCheckout = true;
  } else {
    state.courier_cost = 0;
    state.courier_service = "";
    state.buttonCheckout = false;
  }
  calculateGrandTotal();
}

function calculateGrandTotal() {
  state.grandTotal = Number(cartTotal.value) + Number(state.courier_cost);
}

async function checkout() {
  validation.name = !state.name;
  validation.phone = !state.phone;
  validation.address = !state.address;

  if (validation.name || validation.phone || validation.address || !cartWeight.value || !state.courier_cost) {
    if (!cartWeight.value) alert("Keranjang Anda kosong.");
    if (cartWeight.value > 0 && !state.courier_cost && state.courier_type) alert("Pilih layanan kurir terlebih dahulu.");
    return;
  }

  const orderData = {
    name: state.name,
    phone: state.phone,
    province_id: state.province_id,
    city_id: state.city_id,
    courier_type: state.courier_type,
    courier_service: state.courier_service,
    courier_cost: state.courier_cost,
    weight: cartWeight.value,
    address: state.address,
    grandTotal: state.grandTotal,
  };


  try {
    if (!authStore.token) {
      router.push({ name: 'login' });
      return;
    }
    const response = await cartStore.checkout(orderData);
    if (response && response[0].snap_token) {
      router.push({ name: 'detail_order', params: { snap_token: response[0].snap_token } });
    } else {
      console.error("Checkout failed:", response);
    }
  } catch (error) {
    console.error("Error during checkout:", error);
  }
}
watch([() => cartStore.cartTotal, () => state.courier_cost], () => {
  calculateGrandTotal();
});
</script>
