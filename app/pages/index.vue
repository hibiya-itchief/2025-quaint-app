<template>
  <main class="ma-4">
    <h1 class="text">Hello world!</h1>
    <div class="mb-4">
      <v-btn class="bluebtn glass-card" NuxtLink to="/login"> Login </v-btn>
      <v-btn class="bluebtn glass-card" NuxtLink to="/about"> About </v-btn>
    </div>

    <v-card
      v-for="topic in news"
      :key="topic.timestamp"
      class="my-2 glass-card"
    >
      <div>
        <v-card-title class="text">
          {{ topic.title }}
        </v-card-title>
        <v-card-text>
          {{ topic.detail }}
        </v-card-text>
        <v-card-subtitle>
          {{ topic.author }}
        </v-card-subtitle>
      </div>
    </v-card>
  </main>
</template>

<script setup>
const config = useRuntimeConfig();
const { data: news } = await useFetch(`${config.public.apiBase}/news`);
</script>
