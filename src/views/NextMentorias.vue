<template>
  <div>
    <transition-group
      v-if="!isConferenceFinished"
      tag="div"
      name="fade"
      mode="out-in"
      class="tile is-parent is-vertical"
      v-infinite-scroll="loadMore"
      :infinite-scroll-disabled="isFetchingMore || !canFetchMore"
      appear
    >
      <opportunity-preview-card
        v-for="mentoria in mentorias"
        :key="mentoria.id"
        :mentoria="mentoria"
      />
    </transition-group>
    <div
      v-if="(isFetchingMore || isListEmpty) && !isConferenceFinished"
      class="tile is-parent is-vertical"
    >
      <placeholder-event-preview-card />
    </div>
    <div
      v-if="isConferenceFinished"
      class="tile is-parent is-vertical"
    >
      <thank-you-note
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import infiniteScroll from 'vue-infinite-scroll';
import OpportunityPreviewCard from '../components/OpportunityPreviewCard.vue';
import PlaceholderEventPreviewCard from '../components/placeholders/PlaceholderEventPreviewCard.vue';
import ThankYouNote from '../components/ThankYouNote.vue';

export default {
  name: 'NextMentorias',
  components: {
    'opportunity-preview-card': OpportunityPreviewCard,
    'placeholder-event-preview-card': PlaceholderEventPreviewCard,
    'thank-you-note': ThankYouNote,
  },
  directives: {
    infiniteScroll,
  },
  data: () => ({
    isFetchingMore: false,
  }),
  methods: {
    ...mapActions({
      fetchNextMentorias: 'mentorias/fetchNextMentorias',
      fetchMoreNextMentorias: 'mentorias/fetchMoreNextMentorias',
    }),
    async loadMore() {
      if (this.isFetchingMore) return;
      this.isFetchingMore = true;

      try {
        await this.fetchMoreNextMentorias();
        this.isFetchingMore = false;
      } catch (err) {
        console.error(err);
        this.isFetchingMore = false;
      }
    },
  },
  computed: {
    ...mapGetters({
      mentorias: 'mentorias/nextMentorias',
    }),
    ...mapState('mentorias', {
      canFetchMore: state => state.canFetchMore.next,
      isConferenceFinished: state => state.isConferenceFinished,
    }),
    ...mapState('events', {
      isConferenceFinished: state => state.isConferenceFinished,
    }),
    isListEmpty() {
      return this.mentorias.length === 0;
    },
  },
  created() {
    this.fetchNextMentorias();
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
