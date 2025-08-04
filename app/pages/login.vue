<template>
  <v-app>
    <v-main>
      <v-card>
        <v-card-title>QRコードログイン</v-card-title>
      </v-card>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useAuth, navigateTo } from "#imports";
import { useRoute } from "vue-router";
import { onMounted } from "vue";

defineOptions({
  name: "LoginPage",
});

const { signIn } = useAuth();

onMounted(async () => {
  const { query } = useRoute();
  const token = query.token as string | undefined;

  if (token) {
    try {
      signIn({ token: token }, { redirect: false });
      navigateTo("/");
    } catch (error) {
      console.error("ログインに失敗しました:", error);
    }
  }
});
</script>
