<script setup>
useHead({
  charset: "utf-8",
  viewport: "width=device-width, initial-scale=1",
  title: "Registro - Mi Mandado",
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

function upData() {
  const d = new Date().toLocaleString("es-MX").split(", ");
  fetch("https://vikala-list.netlify.app/.netlify/functions/create-user", {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "email": 'kevin4moe',
      "password": '123456789',
      "country": 'México',
      "state": 'Guanajuato',
      "city": 'Guanajuato'
    }),
  });
}
</script>

<template>
  <div>
    <UButton size="xl" @click="upData" block>Registrarse</UButton>
  </div>
</template>