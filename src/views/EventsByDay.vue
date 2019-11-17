<template>
  <div>
    <div
      class="tile is-parent is-vertical"
      v-infinite-scroll="loadMore"
      :infinite-scroll-disabled="isFetchingMore"
    >
      <event-preview-card
        v-for="(event, index) in events"
        :key="index"
        :event="event"
        id="event.id"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import infiniteScroll from 'vue-infinite-scroll';
import EventPreviewCard from '../components/EventPreviewCard.vue';


export default {
  name: 'EventsByDay',
  props: {
    day: String,
  },
  components: {
    'event-preview-card': EventPreviewCard,
  },
  directives: {
    infiniteScroll,
  },
  data: () => ({
    isFetchingMore: false,
  }),
  methods: {
    ...mapActions({
      fetchEventsByDay: 'events/fetchEventsByDay',
      fetchMoreEventsByDay: 'events/fetchMoreEventsByDay',
    }),
    async loadMore() {
      if (this.isFetchingMore) return;
      this.isFetchingMore = true;

      try {
        await this.fetchMoreEventsByDay({ day: this.day });
        this.isFetchingMore = false;
      } catch (err) {
        console.error(err);
        this.isFetchingMore = false;
      }
    },
  },
  computed: {
    ...mapGetters({
      eventsByDay: 'events/eventsByDay',
    }),
    // ...mapState('events', {
    //   canFetchMore: state => state.canFetchMore[this.day]
    // }),
    events() {
      return this.eventsByDay[this.day] || [];
    },
  },
  watch: {
    day() {
      this.fetchEventsByDay({ day: this.day });
    },
  },
  created() {
    this.fetchEventsByDay({ day: this.day });
  },
};
</script>
