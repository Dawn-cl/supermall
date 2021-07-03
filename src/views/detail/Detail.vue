<template>
  <div id="detail">
    <DetailNavBar class="detail-nav" @titleClick="titleClick" ref="NavBar" />
    <Scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <DetailSwiper :topImages="topImages" />
      <DetailBaseInfo :goods="goods" />
      <DetailShopInfo :shop="shop" />
      <DetailGoodsInfo :detailInfo="detailInfo" @imageLoad="imageLoad" />
      <DetailParamInfo :paramInfo="paramInfo" ref="param" />
      <DetailCommentInfo :commentInfo="commentInfo" ref="comment" />
      <GoodsList :goods="recommend" ref="goodlist" />
    </Scroll>
    <BackTop @click="backClick" v-show="isShowBackTop" />
    <DetailBottomBar @addToCart="addToCart" />
  </div>
</template>

<script>
import DetailNavBar from "./childcomps/DetailNavBar.vue";
import DetailSwiper from "./childcomps/DetailSwiper.vue";
import DetailBaseInfo from "./childcomps/DetailBaseInfo.vue";
import DetailShopInfo from "./childcomps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childcomps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childcomps/DetailParamInfo.vue";
import DetailCommentInfo from "./childcomps/DetailCommentInfo.vue";
import DetailBottomBar from "./childcomps/DetailBottomBar.vue";

import Scroll from "components/common/scroll/scroll.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import { debounce } from "common/utils";
import { backTopMixin } from "common/mixin";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail.js";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0
    };
  },
  mixins: [backTopMixin],
  created() {
    //保存id
    this.iid = this.$route.params.iid;
    //请求数据
    getDetail(this.iid).then(res => {
      const data = res.result;
      //轮播图
      this.topImages = data.itemInfo.topImages;
      //商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //店铺信息
      this.shop = new Shop(data.shopInfo);
      //详情信息
      this.detailInfo = data.detailInfo;
      //参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    getRecommend().then(res => {
      this.recommend = res.data.list;
    });

    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.goodlist.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
    });
  },
  mounted() {
    // 1.图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    this.$bus.on("DetailitemImageLoad", () => {
      refresh();
    });
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000;

      let length = this.themeTopYs.length;
      for (let i = 0; i < length; i++) {
        let iPos = this.themeTopYs[i];
        if (-position.y >= iPos && -position.y < this.themeTopYs[i + 1]) {
          if (this.currentIndex !== i) {
            this.currentIndex = i;
            this.$refs.NavBar.currentIndex = this.currentIndex;
          }
          break;
        }
      }
    },
    addToCart() {
      // 2.将商品信息添加到Store中
      const obj = {};
      obj.iid = this.iid;
      obj.imgURL = this.topImages[0];
      obj.title = this.goods.title;
      obj.desc = this.goods.desc;
      obj.price = this.goods.realPrice;

      this.$store.dispatch("addCart", obj).then(() => {
        this.$toast({ message: "加入购物车成功" });
      });
    }
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 93px);
}
</style>
