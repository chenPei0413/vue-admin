<template>
    <div id="svgIcon">
         {{msg}}
    </div>
</template>
<script>
    import {reactive, ref, onMounted} from '@vue/composition-api';
    export default {
        name: 'svgIcon',
        setup(props, {refs}){
            const msg = ref('svg!!')
            return {
                msg
            }
        }
    }
</script>
<style scoped>

</style>