<script setup>
import { ProductList } from "../assets/models/productList.js";

const productList = new ProductList();

productList.addProduct({
  name: "Manzana",
  category: "Frutas y Verduras",
  unit: "kg",
  quantity: 0.5,
  price: 100,
  total: 50,
});

const columns = [
  { key: "name", label: "Producto" },
  { key: "category", label: "Categoria" },
  { key: "price", label: "Precio" },
  { key: "quantity", label: "Cantidad" },
  { key: "unit", label: "Unidad" },
  { key: "total", label: "Total" },
  { key: "actions" },
];

const selectedColumns = ref([...columns]);

const name = ref("");

const categories = ["Alimentos", "Bebidas", "Limpieza", "Higiene", "Otros"];
const category = ref(categories[0]);

const measurements = ["kg", "L", "und"];
const unit = ref(measurements[0]);

const quantity = ref(1);

const price = ref(null);

function addOne() {
  const one = {
    name: name.value,
    category: category.value,
    unit: unit.value,
    quantity: quantity.value,
    price: price.value,
  };

  productList.addProduct(one);
}

const items = (row) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => console.log("Edit", row.name),
    },
    {
      label: "Duplicate",
      icon: "i-heroicons-document-duplicate-20-solid",
      click: () => {
        console.log("Duplicate", row.name);
        productList.addProduct({ ...row });
      },
    },
  ],
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => {
        console.log("Delete", row.name);
        productList.removeProduct(row.id);
      },
    },
  ],
];

const selected = ref([productList.getProducts[0]]);
</script>

<template>
  <main class="container mx-auto">
    <div class="grid grid-cols-12 gap-4 w-full max-w-[32rem] mx-auto">
      <UFormGroup class="col-span-8" name="name" label="Nombre del producto">
        <UInput v-model="name" />
      </UFormGroup>
      <UFormGroup class="col-span-4" name="category" label="Categoría">
        <USelect v-model="category" :options="categories" />
      </UFormGroup>
      <UFormGroup
        class="col-span-3 mt-auto"
        name="unit"
        label="Unidad de referencia"
      >
        <USelect v-model="unit" :options="measurements" />
      </UFormGroup>
      <UFormGroup
        class="col-span-3 mt-auto"
        name="quantity"
        label="Cantidad comprada"
      >
        <UInput v-model.number="quantity">
          <template #trailing>
            <span class="text-gray-500 dark:text-gray-400 text-xs">{{
              unit
            }}</span>
          </template>
        </UInput>
      </UFormGroup>
      <UFormGroup class="col-span-6 mt-auto" name="price" label="Precio">
        <UInput v-model.number="price" type="number" />
      </UFormGroup>
      <UButton class="col-span-12" block @click="addOne"
        >Agregar a la lista</UButton
      >
    </div>
    <UTable
      :columns="selectedColumns"
      :rows="[...productList.getProducts, { total: productList.total }]"
    >
      <template #name-data="{ row }">
        <span
          :class="[
            selected.find((product) => product.id == row.id) &&
              'text-primary-500 dark:text-primary-400',
          ]"
          >{{ row.name }}</span
        >
      </template>
      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-ellipsis-horizontal-20-solid"
          />
        </UDropdown>
      </template>
    </UTable>
  </main>
</template>
