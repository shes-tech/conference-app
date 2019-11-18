<template>
  <content-loader
    :height="160"
    :width="320"
    :speed="2"
    primaryColor="rgba(200,200,200,0.4)"
    secondaryColor="rgba(160,160,160,0.8)"
    style="max-width: 420px;"
  >
    <rect x="0" y="0" rx="3" ry="3" width="170" height="18" />
    <rect x="0" y="50" rx="3" ry="3" width="70" height="10" />
    <rect x="80" y="50" rx="3" ry="3" width="100" height="10" />
    <rect x="190" y="50" rx="3" ry="3" width="10" height="10" />
    <rect x="15" y="70" rx="3" ry="3" width="130" height="10" />
    <rect x="155" y="70" rx="3" ry="3" width="130" height="10" />
    <rect x="15" y="90" rx="3" ry="3" width="90" height="10" />
    <rect x="115" y="90" rx="3" ry="3" width="60" height="10" />
    <rect x="185" y="90" rx="3" ry="3" width="60" height="10" />
    <rect x="0" y="110" rx="3" ry="3" width="30" height="10" />
  </content-loader>
</template>

<script>
import { ContentLoader } from 'vue-content-loader';

export default {
  name: 'PlaceholderEventDescription',
  components: {
    'content-loader': ContentLoader,
  },
};
</script>
