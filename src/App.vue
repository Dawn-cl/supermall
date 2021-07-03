<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <keep-alive exclude="Detail">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <MainTabBar></MainTabBar>
  </div>
</template>

<script>
import MainTabBar from "./components/content/maintabbar/MainTabBar.vue";

export default {
  name: "App",
  components: {
    MainTabBar
  }
};
</script>

<style>
@import "./assets/css/base.css";
</style>
