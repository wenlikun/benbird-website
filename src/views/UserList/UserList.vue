<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input v-model="userName" style="width: 20%" placeholder="用户名"></el-input>
            <el-input v-model="userPhone" style="width: 20%" placeholder="手机号"></el-input>
            <el-button type="primary" icon="el-icon-search" >查询</el-button>
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
            <el-table-column label="邮箱" align="center" show-overflow-tooltip sortable prop="email"/>
            <el-table-column label="真实姓名" align="center" sortable prop="realName"/>
            <el-table-column label="性别" align="center" sortable prop="gender"/>
            <el-table-column label="部门" align="center"  sortable prop="department"/>
            <el-table-column label="上次登陆时间" width="180px" align="center"  sortable prop="lastLoginTime"/>
            <el-table-column label="创建时间" align="center"  sortable prop="createdAt"/>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-dropdown trigger="click">
                        <el-button type="primary" size="small">
                            更多操作<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="handleModify(scope.row)">编辑</el-dropdown-item>
                            <el-dropdown-item>详情</el-dropdown-item>
                            <el-dropdown-item @click.native="drawer=true">权限</el-dropdown-item>
                            <el-dropdown-item @click.native="handleDelete(scope.$index)">删除</el-dropdown-item>
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
                    show-checkbox
                    node-key="path"
                    class="permission-tree"
                    :filter-node-method="filterNode"
            />
            <div style="text-align:center;">
                <el-button type="info" size="mini" @click="drawer=false">取消</el-button>
                <el-button type="success" size="mini">确定</el-button>
            </div>
        </el-drawer>

    </div>
</template>

<script>
    import {Component, Vue , Watch } from 'vue-property-decorator'
    import Pagination from "../../components/Pagination/Pagination";

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
            page : 1 ,
            limit : 20
        }
        drawer = false
        // Drawer 打开的方向
        direction = 'rtl'
        routesData = [
            {
            label: '表格',
            children: [{label: '完整表格'},{label: '测试表格'}]
        }, {
            label: '一级 2',
            children: [{
                label: '二级 2-1',
                children: [{
                    label: '三级 2-1-1'
                }, {
                        label: '三级 2-1-2'
                    }]
            }, {
                label: '二级 2-2',
                children: [{
                    label: '三级 2-2-1'
                }]
            }]
        }, {
            label: '一级 3',
            children: [{
                label: '二级 3-1',
                children: [{
                    label: '三级 3-1-1'
                }]
            }, {
                label: '二级 3-2',
                children: [{
                    label: '三级 3-2-1'
                }]
            }]
        }]
        filterText = ''

        mounted() {
            this.queryList()
        }

        queryList(){
            this.listLoading = false
            this.tableData = [
                {id:1,userName:'123456789',userPhone:'18326676004',email:'18326676004@163.com',realName:'wlk',gender:'男',department:'GCT',lastLoginTime:'2020-12-12 12:12:13',createdAt:'2020-12-01'},
                {id:2,userName:'123456789',userPhone:'18326676004',email:'18326676004@163.com',realName:'wlk',gender:'男',department:'GCT',lastLoginTime:'2020-12-12 12:12:13',createdAt:'2020-12-01'},
                {id:3,userName:'123456789',userPhone:'18326676004',email:'18326676004@163.com',realName:'wlk',gender:'男',department:'GCT',lastLoginTime:'2020-12-12 12:12:13',createdAt:'2020-12-01'},
                {id:4,userName:'123456789',userPhone:'18326676004',email:'18326676004@163.com',realName:'wlk',gender:'男',department:'GCT',lastLoginTime:'2020-12-12 12:12:13',createdAt:'2020-12-01'},
                {id:5,userName:'123456789',userPhone:'18326676004',email:'18326676004@163.com',realName:'wlk',gender:'男',department:'GCT',lastLoginTime:'2020-12-12 12:12:13',createdAt:'2020-12-01'},
                {id:6,userName:'123456789',userPhone:'18326676004',email:'18326676004@163.com',realName:'wlk',gender:'男',department:'GCT',lastLoginTime:'2020-12-12 12:12:13',createdAt:'2020-12-01'},
                {id:7,userName:'123456789',userPhone:'18326676004',email:'18326676004@163.com',realName:'wlk',gender:'男',department:'GCT',lastLoginTime:'2020-12-12 12:12:13',createdAt:'2020-12-01'},
                {id:8,userName:'123456789',userPhone:'18326676004',email:'18326676004@163.com',realName:'wlk',gender:'男',department:'GCT',lastLoginTime:'2020-12-12 12:12:13',createdAt:'2020-12-01'},
                {id:9,userName:'123456789',userPhone:'18326676004',email:'18326676004@163.com',realName:'wlk',gender:'男',department:'GCT',lastLoginTime:'2020-12-12 12:12:13',createdAt:'2020-12-01'},
                {id:10,userName:'123456789',userPhone:'18326676004',email:'18326676004@163.com',realName:'wlk',gender:'男',department:'GCT',lastLoginTime:'2020-12-12 12:12:13',createdAt:'2020-12-01'},
            ]
            this.total = this.tableData.length
            this.listLoading = false
        }

        handleDelete(index){
            this.$notify({
                title: 'Success',
                message: '删除成功',
                type: 'success',
                duration: 2000
            })
            this.tableData.splice(index, 1)
        }

        handleModify(row){
            console.log(row)
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
