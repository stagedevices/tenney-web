<template>
  <DefaultTheme.Layout>
    <template #doc-before>
      <Breadcrumbs />
    </template>
  </DefaultTheme.Layout>
</template>

<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import Breadcrumbs from "./components/Breadcrumbs.vue";
</script>
