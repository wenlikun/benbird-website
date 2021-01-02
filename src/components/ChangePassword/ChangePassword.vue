<template>
    <el-form ref="resetForm" :model="resetForm" :rules="rules" status-icon>
        <el-form-item label="原密码" prop="oldPassword">
            <el-input type="password" v-model="resetForm.oldPassword"/>
        </el-form-item>
        <el-form-item label="现密码" prop="newPassword">
            <el-input type="password" v-model="resetForm.newPassword"/>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
            <el-input type="password" v-model="resetForm.confirmPassword" />
        </el-form-item>
        <el-form-item>
            <el-button type="success" @click="changePwd" >确认修改</el-button>
        </el-form-item>
    </el-form>
</template>

<script>


    export default {
        name: "ChangePassword",
        data(){
            let validPassword=(rule,value,callback)=>{
                let reg= /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,20}$/
                if(!reg.test(value)){callback(new Error('密码必须是由4-20位字母+数字组合'))
                }else{
                    callback()
                }
            };
            let validateNewPwd = (rule,value,callback) => {
                if (value === this.resetForm.oldPassword) {
                    callback(new Error('新密码不能与原密码一致!'));
                } else {
                    callback();
                }
            };
            let validateConfirm = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.resetForm.newPassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                resetForm:{
                    oldPassword:'',
                    newPassword:'',
                    confirmPassword:''
                },
                disabled: true,
                rules:{
                    oldPassword: [{ required: true, message: '原密码不能为空', trigger: 'blur' },
                        { validator: validPassword, trigger: 'blur' }],
                    newPassword: [{ required: true, message: '现密码不能为空', trigger: 'blur' },
                        { validator: validPassword, trigger: 'blur' },
                        { validator: validateNewPwd, trigger: 'blur' },],
                    confirmPassword: [{ required: true, message: '确认密码不能为空', trigger: 'blur' },
                        { validator: validateConfirm, trigger: 'blur' }]
                }
            }
        },
        methods:{
            changePwd(){
                this.$refs['resetForm'].validate((valid) => {
                    if (valid) {
                        this.$message({
                            message: '密码修改成功',
                            type: 'success',
                            duration: 5 * 1000
                        });
                        this.$store.dispatch('user/logout')
                        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
                    }
                });



            }
        }
    }
</script>

<style scoped>

</style>
