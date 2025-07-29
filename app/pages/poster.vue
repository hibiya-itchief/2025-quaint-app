<template>
  <v-app>
    <v-container class="page-bg">
      <img
        src="/images/poster.png"
        alt="星陵祭2025ポスター"
        class="responsive-poster"
      />
      <v-card class="card ma-4" color="primary" variant="tonal">
        <v-card-title class="font-weight-bold">星陵祭2025について</v-card-title>
        <v-card-text class="ma-2 font-weight-bold">
          <ul>
            <li>当日はすべての方が予約なしで星陵祭にご入場いただけます。</li>
            <li>
              星陵祭では全クラスが演劇を行います。観劇についてはオンライン整理券が必須になります。
            </li>
            <li>
              オンライン整理券は当日、当ホームページにて取得することができます。
            </li>
            <li>
              公演時刻や整理券配布時刻については後日、当ホームページにてご案内いたします。
            </li>
            <li>
              当日、整理券は無くなり次第配布を終了いたしますので、予めご了承ください。
            </li>
            <li>
              当ホームページは日比谷高校の有志団体「IT委員会」によって制作中です。公開までもうしばらくお待ち下さい。
            </li>
          </ul>
        </v-card-text>
        <div class="d-flex justify-end">
          <img
            src="/images/ITlogo.jpeg"
            alt="日比谷高校IT委員会ロゴ"
            height="100"
            width="100"
            class="mr-4 mb-4"
          />
        </div>
        <NuxtLink
          to="https://www.instagram.com/seiryofes/"
          target="_blank"
          rel="noopener"
        >
          <v-chip
            class="ml-4 mb-4"
            color="primary"
            variant="outlined"
            prepend-icon="mdi-instagram"
          >
            日比谷高校 星陵祭企画委員会
          </v-chip>
        </NuxtLink>
        <NuxtLink to="https://x.com/hibiya_it" target="_blank" rel="noopener">
          <v-chip
            class="ml-4 mb-4"
            color="primary"
            variant="outlined"
            prepend-icon="mdi-twitter"
          >
            日比谷高校IT委員会
          </v-chip>
        </NuxtLink>
      </v-card>
      <p class="text-caption text-blue-grey-lighten-3">
        © 2025 東京都立日比谷高等学校 IT委員会
      </p>
      <p class="text-caption text-blue-grey-lighten-3">
        IT Chief | Tokyo Metropolitan Hibiya High School
      </p>
    </v-container>
  </v-app>
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

<style>
.page-bg {
  min-height: 100vh;
  display: flex;
  flex-direction: column; /* 子要素を縦並び */
  align-items: center; /* 水平方向中央 */
  user-select: none;
}

.responsive-poster {
  height: 90vh;
  width: auto;
  object-fit: contain;
  display: block;
}

@media (max-width: 600px) {
  .responsive-poster {
    height: auto;
    width: 100vw;
    max-width: 100vw;
  }
  .page-bg {
    min-height: 100vh;
    padding: 0;
  }
}

.card {
  width: 100%;
  max-width: 500px;
}

ul {
  list-style-type: none;
}

li {
  margin-top: 20px;
}

li::before {
  content: "♪ ";
}
</style>
