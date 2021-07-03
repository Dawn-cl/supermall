<template>
  <div id="home">
    <NavBar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </NavBar>
    <TabControl
      :titles="['流行', '新款', '精选']"
      class="tab-control"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    ></TabControl>
    <Scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @scroll="contentScroll"
      :pullUpLoad="true"
      @pullingUp="loadMore"
    >
      <HomeSwiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></HomeSwiper>
      <RecommendViews :recommends="recommends"></RecommendViews>
      <FeatureView></FeatureView>
      <TabControl
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></TabControl>
      <GoodsList :goods="showGoods"></GoodsList>
    </Scroll>
    <BackTop @click="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabcontrol/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import Scroll from "components/common/scroll/scroll.vue";

import HomeSwiper from "./childcomps/HomeSwiper.vue";
import RecommendViews from "./childcomps/RecommendViews";
import FeatureView from "./childcomps/FeatureView.vue";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils.js";
import { backTopMixin } from "common/mixin";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendViews,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll
  },
  data() {
    return {
      results: null,
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    };
  },
  mixins: [backTopMixin],
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();

    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 500);
    this.$bus.on("HomeitemImageLoad", () => {
      refresh();
    });
  },
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.savaY, 0);
  },
  deactivated() {
    this.savaY = this.$refs.scroll.getScrollY();
  },
  methods: {
    // 事件监听
    //选项卡切换
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    //回到顶部
    // 滚动事件
    contentScroll(position) {
      //回到顶部按钮的显示
      this.isShowBackTop = -position.y > 1000;
      //吸顶效果
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    //上拉加载
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    //获取高度
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    //网络请求
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control {
  position: relative;
  z-index: 9;
}
</style>
