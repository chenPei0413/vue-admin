<template>
    <div id="LayoutMain">
        <router-view/>
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
    #LayoutMain{
        position: fixed;top: 75px;left: @navMenu;right: 0;bottom: 0;
        border: 30px solid #f7f7f7;border-bottom: none;
    }
</style>
