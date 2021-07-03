<template>
  <div class="shop-cart">
    <NavBar class="shop-cart-nav">
      <template v-slot:center>
        <div>购物车({{ length }})</div>
      </template>
    </NavBar>
    <CartList></CartList>
    <CartBottomBar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import CartList from "./childcomps/CartList.vue";
import CartBottomBar from "./childcomps/CartBottomBar.vue";

export default {
  name: "Shopcart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    length() {
      return this.$store.state.cartList.length;
    }
  }
};
</script>

<style scoped>
.shop-cart {
  height: 100vh;
}
.shop-cart-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: relative;
  z-index: 9;
}
</style>
