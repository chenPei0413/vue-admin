<template>
    <div id="LayoutNav">
         <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" background-color="#344a5f" text-color="#fff" active-text-color="#fff" router>
            <template v-for="(item, index) in routers">
                <el-submenu :key="item.index" :index="index.toString()" v-if="!item.hidden">
                    <template slot="title">
                        <i :class="item.meta.icon"></i>
                        <span slot="title">{{item.meta.name}}</span>
                    </template>
                    
                    <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.path">
                        {{subItem.meta.name}}
                    </el-menu-item>
                </el-submenu>
            </template>   
        </el-menu>

        <svg-icon />
    </div>
</template>
<script>
    import {reactive, ref, onMounted} from '@vue/composition-api';
    export default {
        name: 'navMenu',
        setup(props, {refs, root}){
            const isCollapse = ref(false);
            const routers = reactive(root.$router.options.routes);
            const handleOpen = (key, keyPath) => {
                console.log(key, keyPath);

            };
            const handleClose = (key, keyPath) => {
                console.log(key, keyPath);
            }
            return {
                isCollapse,
                routers,
                handleOpen,
                handleClose
            }
        }
    }
</script>

<style lang="less" scoped>
@import '@/style/config.less';
    #LayoutNav{
        position: fixed;top: 0;left: 0;
        width: @navMenu;height: 100%;
        background: #344a5f;
    }
</style>
