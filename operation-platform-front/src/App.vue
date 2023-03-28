<template>
  <div id="app">
    <div class="banner"></div>
    <router-view/>
    <!--播放器-->
    <audio ref="player"></audio>
  </div>
</template>

<style lang="stylus">
#app
  width 100%
  height 100%
  position relative
  .banner{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-image: url("/images/banner.jpg");
    background-position center center;
    background-attachment: fixed;
    filter: blur(.3rem);
    background-size: cover;
    z-index -999
  }
</style>
