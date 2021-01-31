<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input v-model="userName" style="width: 20%" placeholder="用户名"></el-input>
            <el-input v-model="userPhone" style="width: 20%" placeholder="手机号"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="queryList">查询</el-button>
            <el-button type="success" icon="el-icon-plus">新增</el-button>
        </div>

        <el-table
                :data="tableData"
                v-loading="listLoading"
                border
                fit
                highlight-current-row
                style="width: 100%">
            <el-table-column label="ID" align="center" sortable prop="id" />
            <el-table-column label="用户名" align="center" sortable prop="userName" />
            <el-table-column label="手机号" align="center" sortable prop="userPhone"/>
            <el-table-column label="邮箱" align="center" show-overflow-tooltip sortable prop="userEmail"/>
            <el-table-column label="昵称" align="center" sortable prop="nickName"/>
            <el-table-column label="性别" align="center" sortable prop="gender" :formatter="genderFormatter"/>
            <el-table-column label="部门" align="center"  sortable prop="department"/>
            <el-table-column label="上次登陆时间" width="180px" align="center"  sortable prop="lastLoginTime"/>
            <el-table-column label="创建时间" align="center"  sortable prop="createdAt"/>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-dropdown trigger="click">
                        <el-button size="small">
                            更多操作<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="handleModify(scope.row)">编辑</el-dropdown-item>
                            <el-dropdown-item>详情</el-dropdown-item>
                            <el-dropdown-item @click.native="openDrawer(scope.row.id)">权限</el-dropdown-item>
                            <el-dropdown-item @click.native="handleDelete(scope.row.id)">删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页功能 -->
        <Pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="queryList" />

        <el-drawer
                title="权限分配"
                :visible.sync="drawer"
                :direction="direction"
                >
            <h2 style="text-align: center">权限列表</h2>
            <template>
                <el-input placeholder="输入关键字进行过滤" v-model="filterText"/>
            </template>
            <el-tree
                    ref="tree"
                    :data="routesData"
                    :default-checked-keys="checkedKeys"
                    :filter-node-method="filterNode"
                    show-checkbox
                    node-key="id"
                    class="permission-tree"
                    default-expand-all
            />
            <div style="text-align:center;">
                <el-button type="info" size="mini" @click="drawer=false">取消</el-button>
                <el-button type="success" size="mini" @click="confirmMenu">确定</el-button>
            </div>
        </el-drawer>

    </div>
</template>

<script>
    import {Component, Vue, Watch} from 'vue-property-decorator'
    import Pagination from "../../components/Pagination/Pagination";
    import {deleteUser, queryUserList,queryUserMenu,confirmUserMenu} from "@/api/user";

    @Component({
        components:{Pagination}
    })
    export default class UserList extends Vue{
        userName = ''
        userPhone = ''
        tableData = []
        listLoading = true
        total = 0
        listQuery = {
            page: 1,
            limit: 20,
            importance: undefined,
            title: undefined,
            type: undefined,
        }
        drawer = false
        // Drawer 打开的方向
        direction = 'rtl'
        routesData = []
        checkedKeys = []
        filterText = ''
        id = 0

        mounted() {
            this.queryList()
        }

        queryList(){
            this.listLoading = true
            const {userName,userPhone,listQuery} = this
            queryUserList({userName,userPhone,currentPage:listQuery.page,pageCount:listQuery.limit}).then(response => {
                const { data } = response
                this.tableData = data.data.results
                this.total = data.data.totalSize
            }).catch(error => {
                this.$message.error(error.data.message);
                this.tableData = []
                this.total = 0
            });
            this.listLoading = false
        }

        genderFormatter(row, column){
            const gender = row.gender
            if('M' === gender){
                return '男'
            }
            if('W' === gender){
                return '女'
            }
            return ''
        }

        handleDelete(id){
            deleteUser(id,this.$store.state.user.name).then(response => {
                this.$notify({
                    title: 'Success',
                    message: '删除成功',
                    type: 'success',
                    duration: 2000
                })
                this.queryList()
            }).catch(error => {
                this.$message.error(error.data.message);
            })

        }

        handleModify(row){
            console.log(row)
        }


        pushId(routers,checkedId){
            routers.forEach(route => {
                if('/' !== route.path){
                    checkedId.push(route.id)
                    const children = route.children
                    if(children){
                        checkedId.splice(checkedId.indexOf(route.id),1)
                        this.pushId(children,checkedId)
                    }
                }
            })
        }

        async openDrawer(id) {
            this.drawer = true
            this.id = id
            this.checkedKeys = []
            if (this.routesData) {
                await queryUserMenu(0).then(response => {
                        const {data} = response
                        this.routesData = data.data
                    }).catch(error => {
                        this.$message.error(error.data.message);
                    })
            }
            this.checkedRouters = []
            await queryUserMenu(id).then(response => {
                    const {data} = response
                    this.checkedRouters = data.data
                }).catch(error => {
                    this.$message.error(error.data.message);
                })

            this.pushId(this.checkedRouters,this.checkedKeys)
            this.checkedKeys = JSON.parse(JSON.stringify(this.checkedKeys));

        }

        async confirmMenu() {
            let menuId = [].concat(this.$refs.tree.getCheckedKeys(), this.$refs.tree.getHalfCheckedKeys())
            await confirmUserMenu({id:this.id, menuList: menuId, updatedBy: this.$store.state.user.name})
                .then(response => {
                    this.drawer = false
                    this.$message({message: '权限分配成功', type: 'success'});
                }).catch(error => {
                    this.$message.error(error.data.message);
                })
        }

        @Watch('filterText')
        filterTextFunction(val) {
            this.$refs.tree.filter(val);
        }

        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        }

    }
</script>

<style lang="scss" scoped>
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
</style>
