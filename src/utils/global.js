export default {
    install(Vue, options){
        Vue.prototype.confirm = function(res){
            this.$confirm(res.content, res.tip || '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                res.fn && res.fn()
                // if(res.fn){res.fn()}
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    }
}