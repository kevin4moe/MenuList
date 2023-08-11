<script setup>
import { useProductsStore } from "../assets/stores/MisCompras.js";

const productList = useProductsStore();

const props = defineProps({
  id: { type: String, required: false, default: null },
  label: { type: String, required: false, default: "Agregar" },
});

const emit = defineEmits(["clickAddOne"]);

const categories = ["Alimentos", "Bebidas", "Limpieza", "Higiene", "Otros"];
const measurements = ["und", "kg", "L"];

const md = props.id ? productList.getProduct(props.id) : {};

const art = reactive({
  name: md.name || "",
  category: md.category || categories[0],
  unit: md.unit || measurements[0],
  quantity: md.quantity || 1,
  price: md.price || null,
});
</script>

<template>
  <div>
    <UFormGroup class="col-span-8" name="name" label="Nombre del producto">
      <UInput v-model="art.name" @focus="(event) => event.target.select()" />
    </UFormGroup>
    <UFormGroup class="col-span-4" name="category" label="Categoría">
      <USelect v-model="art.category" :options="categories" />
    </UFormGroup>
    <UFormGroup
      class="col-span-3 mt-auto"
      name="unit"
      label="Unidad de referencia"
    >
      <USelect v-model="art.unit" :options="measurements" />
    </UFormGroup>
    <UFormGroup
      class="col-span-4 mt-auto"
      name="quantity"
      label="Cantidad comprada"
    >
      <UInput
        v-model.number="art.quantity"
        type="number"
        step="0.01"
        @focus="(event) => event.target.select()"
      >
        <template #trailing>
          <span class="text-gray-500 dark:text-gray-400 text-xs">{{
            art.unit
          }}</span>
        </template>
      </UInput>
    </UFormGroup>
    <UFormGroup
      class="col-span-5 mt-auto"
      name="price"
      :label="art.unit == 'und' ? 'Precio x unidad' : `Precio x ${art.unit}`"
    >
      <UInput
        v-model.number="art.price"
        type="number"
        step="0.1"
        @focus="(event) => event.target.select()"
      />
    </UFormGroup>
    <UButton class="col-span-12" block @click="$emit('clickAddOne', art)">{{
      props.label
    }}</UButton>
  </div>
</template>
