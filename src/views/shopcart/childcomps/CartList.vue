<template>
  <Scroll class="cart-list" ref="scroll">
    <CartListItem
      v-for="item in list"
      :key="item.iid"
      :itemInfo="item"
      class="content"
    ></CartListItem>
  </Scroll>
</template>

<script>
import Scroll from "components/common/scroll/scroll.vue";
import CartListItem from "./CartListItem";

export default {
  name: "CartList",
  computed: {
    list() {
      return this.$store.state.cartList;
    }
  },
  components: {
    Scroll,
    CartListItem
  },
  activated() {
    this.$refs.scroll.refresh();
  }
};
</script>

<style scoped>
.cart-list {
  height: calc(100% - 93px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>
