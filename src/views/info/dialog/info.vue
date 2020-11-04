<template>
    <el-dialog title="新增" :visible.sync="dialog_status" @close="close" width="580px" @open="openDialog">
        <el-form :model="form" ref="ruleForm">
            <el-form-item label="类别" :label-width="formLabelWidth" prop="region">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option 
                        v-for="item in categoryOption.item" :key="item.id" 
                        :label="item.category_name" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
                <el-input v-model="form.title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="概况" :label-width="formLabelWidth" prop="content">
                <el-input v-model="form.content" type="textarea" placeholder="请输入概况"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取消</el-button>
            <el-button type="danger" @click="submit" :loading="loadFalg">确定</el-button>
        </div>
    </el-dialog>
</template>
<script>
    // import { ref, reactive, watch } from '@vue/composition-api'
    import {AddInfo} from '@/service/api_2/news.js'

    export default({
        name: 'DialogInfo',
        // vue 3.0
        // props: {
        //     dialogStatus: {
        //         type: Boolean,
        //         default: false
        //     }
        // },
        // setup(props, {root, emit}){
        //     // ref
        //     const dialog_status = ref(false);
        //     const formLabelWidth = ref('70px');
        //     // reactive
        //     const form = reactive({
        //             name: '',
        //             region: '',
        //             date1: '',
        //             date2: '',
        //             delivery: false,
        //             type: [],
        //             resource: '',
        //             desc: ''
        //     })
        //     console.log(dialog_status.value)
        //     console.log(props.dialogStatus)
        //     watch(() => dialog_status.value = props.dialogStatus)
        //     const close = () => {
        //         dialog_status.value = false
        //         emit('close', false)
        //         console.log(1213)
        //     }
        //     return{ 
        //         dialog_status,
        //         form,
        //         formLabelWidth,
        //         close       
        //     } 
        // }

        // vue 2.0
        data(){
            return {
                dialog_status: false,
                loadFalg: false,
                form: {
                    title: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',
                    content: ''
                },
                formLabelWidth: '70px',
                categoryOption: {
                    item: []
                }
            }
        },
        props: {
            dialogStatus: {
                type: Boolean,
                default: false
            },
            category: {
                type: Array,
                default: () => []
            }
        },
        watch: {
            dialogStatus: {
                handler(newVlue, oldValue){
                    this.dialog_status = newVlue
                }
            }
        },
        created(){
        },
        methods: {
            close(){
                this.dialog_status = false
                this.$emit('close', false)
                this.$refs['ruleForm'].resetFields()
                // this.$emit('update:dialogStatus', false)
            },
            openDialog(){
                this.categoryOption.item = this.category
            },
            submit(){
                this.loadFalg = true;
                let requesData = {
                    categoryId: this.form.region,
                    title: this.form.title,
                    imgUrl: '',
                    createDate: this.form.region,
                    status: 1,
                    content: this.form.content
                }
                AddInfo(requesData).then(res => {
                    this.loadFalg = false;
                    this.$refs['ruleForm'].resetFields()
                    this.dialog_status = false
                    this.$emit('close', false)
                    this.$emit('getList')
                    // this.$emit('callbackFun', {function: "getList", date: 111})

                }).catch(err => {
                    this.loadFalg = false;
                    this.$message.error(err.message);
                })                
            }
        }
    })
</script>
<style>

</style>