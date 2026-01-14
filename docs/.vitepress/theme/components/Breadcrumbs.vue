<template>
  <nav class="docs-breadcrumbs" aria-label="Breadcrumb">
    <a class="docs-breadcrumbs__link" href="/tenney-web/">Tenney</a>
    <span class="docs-breadcrumbs__sep" aria-hidden="true">›</span>
    <a class="docs-breadcrumbs__link" :href="withBase('/')">Docs</a>
    <template v-if="sectionLabel">
      <span class="docs-breadcrumbs__sep" aria-hidden="true">›</span>
      <a class="docs-breadcrumbs__link" :href="withBase(`/${sectionSlug}/`)">{{ sectionLabel }}</a>
    </template>
    <template v-if="showPage">
      <span class="docs-breadcrumbs__sep" aria-hidden="true">›</span>
      <span class="docs-breadcrumbs__current">{{ pageLabel }}</span>
    </template>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useData, useRoute, withBase } from "vitepress";

const { frontmatter } = useData();
const route = useRoute();

const sectionMap: Record<string, string> = {
  "getting-started": "Getting started",
  "ji-primer": "Just Intonation primer",
  "lattice-tuner": "Lattice + tuner concepts",
  export: "Saving + exporting scales",
  "stage-workflow": "Stage workflow / timing",
  advanced: "Advanced / under the hood",
};

const segments = computed(() => route.path.split("/").filter(Boolean));
const sectionSlug = computed(() => segments.value[0] ?? "");
const sectionLabel = computed(() =>
  sectionSlug.value ? sectionMap[sectionSlug.value] ?? toTitle(sectionSlug.value) : ""
);

const pageLabel = computed(() => {
  if (frontmatter.value.title) {
    return frontmatter.value.title as string;
  }
  const last = segments.value[segments.value.length - 1];
  if (!last || last === sectionSlug.value) {
    return "";
  }
  return toTitle(last);
});

const showPage = computed(() => Boolean(pageLabel.value) && pageLabel.value !== sectionLabel.value);

function toTitle(value: string) {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
</script>
