<script setup>
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