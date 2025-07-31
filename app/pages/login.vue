<template>
  <p>QRコードログイン画面</p>
  <p>QRコードを読み取ると自動ログインします。</p>
</template>

<script setup lang="ts">
import { useAuth, useAuthState, navigateTo } from "#imports";
import { useRoute } from "vue-router";
import { onMounted } from "vue";

defineOptions({
  name: "LoginPage",
});

const { signIn } = useAuth();

onMounted(async () => {
  const { query } = useRoute();
  const token = query.token as string | undefined;
  const credentials = { token: token };

  if (token) {
    try {
      await signIn(credentials, { redirect: false }); // JWTをクッキーに保存
      const { rawToken } = useAuthState();
      console.log("rawToken:", rawToken.value);
      navigateTo("/");
    } catch (error) {
      console.error("ログインに失敗しました:", error);
      // エラーハンドリングを追加することもできます
    }
  }
});
</script>
