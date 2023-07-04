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

const items = (row) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => {
        console.log("Edit", row);
        isOpen.value = true;
        modelData = { ...row };
      },
    },
    {
      label: "Duplicate",
      icon: "i-heroicons-document-duplicate-20-solid",
      click: () => {
        console.log("Duplicate", row.name);
        productList.addProduct({ ...row, id: row.id });
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

const isOpen = ref(false);

let modelData = {};

function addOne(one) {
  productList.addProduct(one);
}
function updateOne(one) {
  productList.updateProduct(modelData.ids, one);
}
</script>

<template>
  <main class="container mx-auto">
    <edit-menu
      class="grid grid-cols-12 gap-4 w-full max-w-[32rem] mx-auto mb-4"
      @clickAddOne="addOne"
    />
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
    <UModal v-model="isOpen">
      <edit-menu
        class="grid grid-cols-12 gap-4 w-full max-w-[32rem] mx-auto mb-4 p-4"
        :modelData="modelData"
        @clickAddOne="updateOne"
      />
    </UModal>
  </main>
</template>
