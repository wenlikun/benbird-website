<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input v-model="menuName" style="width: 20%" placeholder="菜单名称"></el-input>
            <el-input v-model="menuUrl" style="width: 20%" placeholder="菜单路径"></el-input>
            <el-button type="primary" icon="el-icon-search" >查询</el-button>
            <el-button type="success" icon="el-icon-plus">新增</el-button>
        </div>

        <el-table
                :data="tableData"
                v-loading="listLoading"
                row-key="id"
                lazy
                :load="load"
                :tree-props="{hasChildren: 'hasChildren'}"
                border
                fit
                highlight-current-row
                style="width: 100%">
            <el-table-column label="ID" align="center" sortable prop="id" />
            <el-table-column label="菜单名称" align="center" sortable prop="menuName" />
            <el-table-column label="菜单路径" align="center" sortable prop="menuUrl"/>
            <el-table-column label="菜单类型" align="center" sortable prop="menuType"/>
            <el-table-column label="父菜单名称" align="center" sortable prop="parentMenuName"/>
            <el-table-column label="是否禁用" align="center" sortable>
                <template slot-scope="{row}">
                    <el-switch
                            v-model="row.isDisabled"
                            active-color="#13ce66"
                            inactive-color="#808080"
                            active-value="true"
                            inactive-value="false"
                            @click.native="changeStatus(row)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center"  sortable prop="createdAt"/>
        </el-table>

        <!-- 分页功能 -->
        <Pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="queryList" />
    </div>
</template>

<script>
    import {Component, Vue , Watch } from 'vue-property-decorator'
    import Pagination from "../../components/Pagination/Pagination";

    @Component({
        components:{Pagination}
    })
    export default class UrlList extends Vue{
        menuName = ''
        menuUrl = ''
        tableData = []
        listLoading = true
        total = 0
        listQuery = {
            page : 1 ,
            limit : 20
        }

        mounted() {
            this.queryList()
        }

        queryList(){
            this.listLoading = true
            this.tableData = [
                {id:1,menuName:'首页',menuUrl:'/dashboard',menuType:'页面',parentMenuName:'',isDisabled:'false',createdAt:'2020-01-01'},
                {id:2,menuName:'首页',menuUrl:'/dashboard',menuType:'页面',parentMenuName:'',isDisabled:'false',createdAt:'2020-01-01'},
                {id:3,menuName:'首页',menuUrl:'/dashboard',menuType:'页面',parentMenuName:'',isDisabled:'false',createdAt:'2020-01-01'},
                {id:4,menuName:'首页',menuUrl:'/dashboard',menuType:'页面',parentMenuName:'',isDisabled:'false',createdAt:'2020-01-01'},
                {id:5,menuName:'首页',menuUrl:'/dashboard',menuType:'页面',parentMenuName:'',isDisabled:'true',createdAt:'2020-01-01', hasChildren: true},
                {id:6,menuName:'首页',menuUrl:'/dashboard',menuType:'页面',parentMenuName:'',isDisabled:'false',createdAt:'2020-01-01'},
                {id:7,menuName:'首页',menuUrl:'/dashboard',menuType:'页面',parentMenuName:'',isDisabled:'true',createdAt:'2020-01-01'},
                {id:8,menuName:'首页',menuUrl:'/dashboard',menuType:'页面',parentMenuName:'',isDisabled:'false',createdAt:'2020-01-01'},
                {id:9,menuName:'首页',menuUrl:'/dashboard',menuType:'页面',parentMenuName:'',isDisabled:'false',createdAt:'2020-01-01'},
                {id:10,menuName:'首页',menuUrl:'/dashboard',menuType:'页面',parentMenuName:'',isDisabled:'false',createdAt:'2020-01-01'},
                {id:11,menuName:'首页',menuUrl:'/dashboard',menuType:'页面',parentMenuName:'',isDisabled:'false',createdAt:'2020-01-01'},
            ]
            this.total = this.tableData.length
            setTimeout(() => {
                this.listLoading = false
            }, 1.5 * 1000)
        }

        load(tree, treeNode, resolve) {
            setTimeout(() => {
                resolve([
                    {id: 20, menuName: '新增', menuUrl: '/add', menuType: '按钮', parentMenuName:'/dashboard', isDisabled:'false', createdAt:'2020-01-01'},
                    {id: 21, menuName: '查询', menuUrl: '/query', menuType: '按钮', parentMenuName:'/dashboard', isDisabled:'false', createdAt:'2020-01-01'}
                ])
            }, 1000)
        }

        changeStatus(row){
            let flag = row.isDisabled
            this.$confirm('确认'+(flag==='true'?'打开':'禁用')+'该功能吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '操作成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });
                row.isDisabled = flag==='true'?'false':'true'
            });
        }

    }
</script>

<style scoped>

</style>
