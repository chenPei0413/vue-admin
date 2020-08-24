<template>
  <div id="LayoutHeader">
    头部
  </div>
</template>
<script>
    export default {
        name: 'Console',
        setup(){
            
        }
    }
</script>
<style lang="less" scoped>
@import '@/style/config.less';
  #LayoutHeader{
        position: fixed;top: 0;left: @navMenu;right: 0;
        height: 75px;background: #fff;
        box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1)
    }
</style>
