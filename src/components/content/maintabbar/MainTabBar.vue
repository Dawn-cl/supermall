<template>
  <TabBar>
      <TabBarItem path='/home' activeColor='#ff8198'>
      <template v-slot:item-icon>
        <img src="~assets/img/tabbar/home.svg" alt="" class="icon">
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/tabbar/home_active.svg" alt="" class="icon">
      </template>
      <template v-slot:item-text>
        <div slot="item-text">首页</div>
      </template>
      </TabBarItem>
      <TabBarItem path='/category' activeColor='#ff8198'>
      <template v-slot:item-icon>
        <img src="~assets/img/tabbar/category.svg" alt="" class="icon">
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/tabbar/category_active.svg" alt="" class="icon">
      </template>
      <template v-slot:item-text>
        <div>分类</div>
      </template>
      </TabBarItem>
      <TabBarItem path='/shopcart' activeColor='#ff8198'>
      <template v-slot:item-icon>
        <img src="~assets/img/tabbar/shopcart.svg" alt="" class="icon">
        </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/tabbar/shopcart_active.svg" alt="" class="icon">
      </template>
      <template v-slot:item-text>
        <div slot="item-text">购物车</div>
      </template>
      </TabBarItem>
      <TabBarItem path="/profile" activeColor='#ff8198'>
      <template v-slot:item-icon>
        <img src="~assets/img/tabbar/profile.svg" alt="" class="icon">
        </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/tabbar/profile_active.svg" alt="" class="icon">
      </template>
      <template v-slot:item-text>
        <div>我的</div>
      </template>
      </TabBarItem>
    </TabBar>
</template>

<script>
import TabBar from "../../common/tabbar/TabBar.vue"
import TabBarItem from "../../common/tabbar/TabBarItem.vue"
export default {
  name:"MainTabBar",
  components:{
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>
.icon{
  width:24px;
  height: 24px;
  margin-top: 3px;
  margin-bottom: 2px;
  vertical-align: middle;
}
</style>