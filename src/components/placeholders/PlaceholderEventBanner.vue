<template>
  <content-loader
    :height="180"
    :width="320"
    :speed="2"
    primaryColor="rgba(200,200,200,0.4)"
    secondaryColor="rgba(160,160,160,0.8)"
    style="max-width: 420px;"
  >
    <rect x="0" y="0" rx="3" ry="3" width="50" height="18" />

    <rect x="0" y="36" rx="3" ry="3" width="320" height="24" />
    <rect x="0" y="68" rx="3" ry="3" width="120" height="18" />

    <rect x="0" y="118" rx="3" ry="3" width="180" height="16" />
    <rect x="0" y="142" rx="3" ry="3" width="120" height="16" />
  </content-loader>
</template>

<script>
import { ContentLoader } from 'vue-content-loader';

export default {
  name: 'PlaceholderEventBanner',
  components: {
    'content-loader': ContentLoader,
  },
};
</script>
