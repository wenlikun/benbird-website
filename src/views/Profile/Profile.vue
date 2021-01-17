<template>
    <div class="app-container">
        <div v-if="user">
            <el-row :gutter="20">

                <el-col :span="6" :xs="24">
                    <UserCard :user="user" />
                </el-col>
                <el-col :span="18" :xs="24">
                <el-card>
                    <el-tabs v-model="activeTab">
                        <el-tab-pane label="账户信息" name="account">
                            <Account :user="user" />
                        </el-tab-pane>
                        <el-tab-pane label="修改密码" name="timeline">
                            <ChangePassword/>
                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </el-col>

            </el-row>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import UserCard from "@/views/Profile/components/UserCard";
    import Account from "@/components/Account/Account";
    import ChangePassword from "@/components/ChangePassword/ChangePassword";

    export default {
        name: 'Profile',
        components: { UserCard , Account , ChangePassword},
        data() {
            return {
                user: {},
                activeTab: 'account'
            }
        },
        computed: {
            ...mapGetters([
                'name',
                'avatar',
                'roles',
                'userEmail',
                'nickName'
            ])
        },
        created() {
            this.getUser()
        },
        methods: {
            getUser() {
                this.user = {
                    name: this.name,
                    role: this.roles.join(' | '),
                    email: this.userEmail,
                    avatar: this.avatar,
                    nickName:this.nickName
                }
            }
        }
    }
</script>
