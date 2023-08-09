<script setup>
import { useProductsStore } from "../assets/stores/MisCompras.js";

const productList = useProductsStore();

useHead({
  charset: "utf-8",
  viewport: "width=device-width, initial-scale=1",
  title: "Mi Mandado",
  meta: [
    {
      name: "Mi Mandado",
      content: "Crea una lista del mandado y registra los precios.",
    },
  ],
  link: [
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/favicon/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon/favicon-16x16.png",
    },
    {
      rel: "manifest",
      href: "/site.webmanifest",
    },
  ],
  script: [
    {
      src: "/sw.js",
    },
  ],
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

function upData() {
  fetch("https://vikala-list.netlify.app/.netlify/functions/pdf", {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([...productList.getProducts]),
  })
    .then((response) => response.blob())
    .catch((error) => console.error("Error:", error))
    .then((blob) => {
      console.log("Success:", blob);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      // the filename you want
      a.download = "todo-1.json";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    });
}
</script>

<template>
  <main class="container mx-auto">
    <edit-menu
      class="grid grid-cols-12 gap-4 w-full w-full max-w-[32rem] mx-auto mb-4 p-4"
      @clickAddOne="addOne"
    />
    <UTable
      :columns="selectedColumns"
      :rows="[...productList.getProducts, { total: productList.total }]"
    >
      <template #name-data="{ row }">
        <span>{{ row.name }}</span>
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
    <UButton size="xl" @click="upData" block>Descargar PDF</UButton>
  </main>
</template>
