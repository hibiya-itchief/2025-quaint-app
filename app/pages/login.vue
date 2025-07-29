<template>
  <p>QRコードログイン画面</p>
  <p>QRコードを読み取ると自動ログインします。</p>
</template>

<script setup lang="ts">
import { useAuth, navigateTo } from "#imports";
import { useRoute } from "vue-router";
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
    try {
      await signIn({ token }, { redirect: false }); // JWTをクッキーに保存
      navigateTo("/", { external: false }); // トップページへ遷移}
    } catch (error) {
      console.error("ログインに失敗しました:", error);
      // エラーハンドリングを追加することもできます
    }
  }
});
</script>
