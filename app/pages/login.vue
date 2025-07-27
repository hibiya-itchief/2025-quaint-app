<template>
  <p>QRコードログイン画面</p>
  <p>QRコードを読み取ると自動ログインします。</p>
</template>

<script setup lang="ts">
import { useAuthState, useAuth, useRoute, navigateTo } from "#imports";
import { onMounted } from "vue";

defineOptions({
  name: "LoginPage",
});

const { query } = useRoute();
const token = query.token as string | undefined;

const { setToken } = useAuthState();
const { getSession } = useAuth();

onMounted(async () => {
  console.log("取得したtoken:", token);
  if (token) {
    setToken(token); // JWTをクッキーに保存
    getSession(); // セッション情報を取得
    navigateTo("/"); // トップページへ遷移
  }
});
</script>
