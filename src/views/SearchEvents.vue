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
      v-if="(isFetchingMore || isListEmpty) && !isSearchEmpty"
      class="tile is-parent is-vertical"
    >
      <placeholder-event-preview-card />
    </div>
    <div
      v-if="isSearchEmpty"
      class="tile is-parent is-vertical has-text-centered"
    >
      <p>Nenhum resultado encontrado</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import infiniteScroll from 'vue-infinite-scroll';
import EventPreviewCard from '../components/EventPreviewCard.vue';
import PlaceholderEventPreviewCard from '../components/placeholders/PlaceholderEventPreviewCard.vue';

export default {
  name: 'SearchEvents',
  props: {
    query: {
      type: String,
      required: true,
    },
  },
  components: {
    'event-preview-card': EventPreviewCard,
    'placeholder-event-preview-card': PlaceholderEventPreviewCard,
  },
  directives: {
    infiniteScroll,
  },
  data: () => ({
    isFetchingMore: false,
    isInitialSearchDone: false,
  }),
  methods: {
    ...mapActions({
      fetchSearchEvents: 'events/fetchSearchEvents',
      fetchMoreSearchEvents: 'events/fetchMoreSearchEvents',
      clearSearch: 'events/clearSearch',
    }),
    async search() {
      const { query } = this;
      if (query) {
        this.isInitialSearchDone = false;
        await this.clearSearch();
        await this.fetchSearchEvents(query);
        this.isInitialSearchDone = true;
      }
    },
    async loadMore() {
      if (!this.isInitialSearchDone) return;
      if (this.isFetchingMore) return;
      if (this.isSearchEmpty) return;
      this.isFetchingMore = true;

      try {
        await this.fetchMoreSearchEvents(this.query);
        this.isFetchingMore = false;
      } catch (err) {
        console.error(err);
        this.isFetchingMore = false;
      }
    },
  },
  computed: {
    ...mapGetters({
      events: 'events/searchEvents',
      isEmpty: 'events/isEmpty',
    }),
    ...mapState('events', {
      canFetchMore: state => state.canFetchMore.search,
    }),
    isListEmpty() {
      return this.events.length === 0;
    },
    isSearchEmpty() {
      return this.isEmpty.search;
    },
  },
  mounted() {
    this.search();
  },
  watch: {
    query() {
      this.search();
    },
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
