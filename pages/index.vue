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

const columns = reactive([
  {
    key: "name",
    label: "Articulo",
  },
  { key: "category", label: "Categoria" },
  { key: "price", label: "Precio" },
  { key: "quantity", label: "Cantidad" },
  { key: "unit", label: "Unidad" },
  { key: "total", label: "Total" },
  { key: "actions" },
]);

const items = (row) => [
  [
    {
      label: "Modificar",
      icon: "i-heroicons-pencil-square-20-solid last:text-red-900",
      click: () => {
        console.log("Edit", row);
        isOpen.value = true;
        console.log(row);
        id = row.id;
      },
    },
  ],
  [
    {
      label: "Quitar",
      icon: "i-heroicons-trash-20-solid",
      click: () => {
        console.log("Delete", row.name);
        productList.removeProduct(row.id);
      },
    },
  ],
];

const isOpen = ref(false);

let id = null;

function addOne(one) {
  productList.addProduct(one);
}
function updateOne(one) {
  productList.updateProduct(id, one);
}

function upData() {
  const d = new Date().toLocaleString("es-MX").split(", ");
  fetch("https://vikala-list.netlify.app/.netlify/functions/pdf", {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: Object.keys({ ...updateFormat.value }).map(
        (key) => updateFormat.value[key]
      ),
      date: d,
    }),
  })
    .then((response) => response.blob())
    .catch((error) => console.error("Error:", error))
    .then((blob) => {
      console.log("Success:", blob);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `Mi Mandado ${d[0]} ${d[1]}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    });
}

const currencyFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
});

const updateFormat = computed(() => {
  return [
    ...productList.getProducts.map((item) => {
      return {
        ...item,
        price: currencyFormatter.format(item.price),
        total: currencyFormatter.format(item.total),
      };
    }),
    { total: currencyFormatter.format(productList.total) },
  ];
});

function upDataCloud() {
  const d = new Date().toLocaleString("es-MX").split(", ");
  fetch("https://vikala-list.netlify.app/.netlify/functions/db", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: Object.keys({ ...updateFormat.value }).map(
        (key) => updateFormat.value[key]
      ),
      date: d,
    }),
  })
    .then((response) => response.blob())
    .catch((error) => console.error("Error:", error));
}
</script>

<template>
  <main class="container mx-auto">
    <edit-menu class="grid grid-cols-12 gap-4 w-full max-w-[32rem] mx-auto mb-4 p-4" label="Agregar a la lista"
      @clickAddOne="addOne" />
    <UTable :columns="[...columns]" :rows="updateFormat">
      <template #name-data="{ row }">
        <span>{{ row.name }}</span>
      </template>
      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable>
    <UModal v-model="isOpen">
      <edit-menu class="grid grid-cols-12 gap-4 w-full max-w-[32rem] mx-auto mb-4 p-4" :id="id" label="Actualizar datos"
        @clickAddOne="updateOne" />
    </UModal>
    <UButton size="xl" @click="upData" block>Descargar PDF</UButton>
    <UButton size="xl" @click="upDataCloud" block>Guardar en la nube</UButton>
  </main>
</template>
