<template>
  <v-card>
    <v-card-title>ホーム</v-card-title>
    <v-card-text>
      <p>ようこそ、星陵祭2025公式サイトへ！</p>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useHead } from "#imports";

defineOptions({
  name: "PosterPage",
});

//ヘッダー情報
useHead({
  title: "ポスター",
});
</script>
