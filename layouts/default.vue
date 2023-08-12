<template>
  <div>
    <slot />
    <UContainer class="mt-4 py-4 bg-slate-100">
      <div class="container flex justify-left gap-x-2 mx-auto overflow-x-auto">
        <UCard v-for="i in 10" class="flex-none w-80">
          <template #header>
            <h4>Hoy</h4>
          </template>

          <ul
            class="grid grid-cols-2 gap-2 w-fit w-72 max-h-80 mx-auto overflow-y-auto"
          >
            <li v-for="n in 10" class="">
              <div
                class="box-content flex justify-center w-32 h-32 sm:w-32 sm:h-32 mx-auto border border-slate-300"
              >
                <span class="self-center">
                  {{ n }}
                </span>
              </div>
            </li>
          </ul>
        </UCard>
      </div>
    </UContainer>
  </div>
</template>
