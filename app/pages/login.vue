<template>
  <p>QRコードログイン画面</p>
  <p>QRコードを読み取ると自動ログインします。</p>
</template>

<script setup lang="ts">
import { useAuth, useRoute, navigateTo } from "#imports";
import { onMounted } from "vue";

defineOptions({
  name: "LoginPage",
});

const { query } = useRoute();
const token = query.token as string | undefined;
const { signIn } = useAuth();

onMounted(async () => {
  console.log("取得したtoken:", token);
  if (token) {
    await signIn({ token }); // JWTをクッキーに保存
    navigateTo("/"); // トップページへ遷移
  }
});
</script>
