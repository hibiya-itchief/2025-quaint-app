<template>
  <v-card>
    <v-card-title>ホーム</v-card-title>
    <v-card-text>
      <p>ようこそ、星陵祭2025公式サイトへ！</p>
      <NuxtLink to="/poster">ポスター</NuxtLink>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useHead, useAuth, definePageMeta } from "#imports";
import { watchEffect } from "vue";

definePageMeta({
  auth: false,
});

const { getSession, status, data } = useAuth();

getSession({ required: true });

watchEffect(() => {
  if (status.value === "authenticated") {
    console.log("ログイン済みユーザー", data.value?.user);
  } else if (status.value === "unauthenticated") {
    console.log("未承認ユーザー");
  }
});

defineOptions({
  name: "PosterPage",
});

//ヘッダー情報
useHead({
  title: "ポスター",
});
</script>
