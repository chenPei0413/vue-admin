<template>
  <div id="Layout">
    <LayoutHeader />
    <LayoutMain />
    <LayoutNav />
    <!-- <el-container>
        <el-aside width="250px">Aside</el-aside>
        <el-container>
            <el-header height="75px">Header</el-header>
            <el-main>Main</el-main>
        </el-container>
    </el-container> -->
  </div>
</template>
<script>
    import LayoutHeader from './Components/Header'
    import LayoutMain from './Components/Main'
    import LayoutNav from './Components/Nav'
    export default {
        name: 'Layout',
        components: {LayoutHeader, LayoutMain, LayoutNav},
        setup(){
            
        }
    }
</script>
<style lang="scss" scoped>
  
</style>

<style>
  .el-header{
    background-color: #fff;
    box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
  }
  
  .el-aside {
    background-color: #344a5f;
    height: 100vh!important;
    color: #fff;
  }
  
  .el-main {
    background-color: #fff;
    border: 30px solid #f7f7f7;
    border-bottom: none;
  }
</style>
