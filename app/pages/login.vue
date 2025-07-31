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
const { setToken } = useAuthState();

onMounted(async () => {
  const { query } = useRoute();
  const token = query.token as string | undefined;
  const credentials = { token: token };

  if (token) {
    try {
      const res = await signIn(credentials, { redirect: false }); // サインインAPI呼び出し
      if (res && typeof res.token === "string") {
        setToken(res.token); // JWTをcookieに保存
      }
      const { rawToken } = useAuthState();
      console.log("rawToken:", rawToken.value);
      navigateTo("/");
    } catch (error) {
      console.error("ログインに失敗しました:", error);
    }
  }
});
</script>
