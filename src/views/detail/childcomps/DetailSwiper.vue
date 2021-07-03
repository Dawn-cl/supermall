<template>
  <Swiper class="swiper-item">
    <SwiperItem v-for="item in topImages" :key="item">
      <img :src="item" alt="" />
    </SwiperItem>
  </Swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "DetailSwiper",
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
};
</script>

<style scoped>
.swiper-item {
  height: 300px;
}
.swiper-item img {
  width: 100%;
}
</style>
