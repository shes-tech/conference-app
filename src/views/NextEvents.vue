<template>
  <div>
    <transition-group
      tag="div"
      name="fade"
      mode="out-in"
      class="tile is-parent is-vertical"
      v-infinite-scroll="loadMore"
      :infinite-scroll-disabled="isFetchingMore || !canFetchMore"
      appear
    >
      <event-preview-card
        v-for="event in events"
        :key="event.id"
        :event="event"
      />
    </transition-group>
    <div
      v-if="isFetchingMore || isListEmpty"
      class="tile is-parent is-vertical"
    >
      <placeholder-event-preview-card />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import infiniteScroll from 'vue-infinite-scroll';
import EventPreviewCard from '../components/EventPreviewCard.vue';
import PlaceholderEventPreviewCard from '../components/placeholders/PlaceholderEventPreviewCard.vue';

export default {
  name: 'NextEvents',
  components: {
    'event-preview-card': EventPreviewCard,
    'placeholder-event-preview-card': PlaceholderEventPreviewCard,
  },
  directives: {
    infiniteScroll,
  },
  data: () => ({
    isFetchingMore: false,
  }),
  methods: {
    ...mapActions({
      fetchNextEvents: 'events/fetchNextEvents',
      fetchMoreNextEvents: 'events/fetchMoreNextEvents',
    }),
    async loadMore() {
      if (this.isFetchingMore) return;
      this.isFetchingMore = true;

      try {
        await this.fetchMoreNextEvents();
        this.isFetchingMore = false;
      } catch (err) {
        console.error(err);
        this.isFetchingMore = false;
      }
    },
  },
  computed: {
    ...mapGetters({
      events: 'events/nextEvents',
    }),
    ...mapState('events', {
      canFetchMore: state => state.canFetchMore.next,
    }),
    isListEmpty() {
      return this.events.length === 0;
    },
  },
  created() {
    this.fetchNextEvents();
  },
};
</script>

<style lang="scss" scoped>
.fade-enter, .fade-leave-to {
  opacity:0;
}

.fade-enter-active {
  animation-name: fadeInUp;
  animation-duration: 480ms;
  -webkit-animation-name: fadeInUp;
  -webkit-animation-duration: 0.5s;
}

@-webkit-keyframes fadeInUp {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
</style>
