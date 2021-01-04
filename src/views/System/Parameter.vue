<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input v-model="paramId" style="width: 20%" placeholder="参数ID"></el-input>
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
            <el-table-column label="ID" align="center" width="70px" sortable prop="id"/>
            <el-table-column label="参数ID" align="center" width="300px" sortable prop="paramId"/>
            <el-table-column label="参数值" align="center" width="300px" sortable prop="paramValue"/>
            <el-table-column label="参数描述" align="center" width="300px" sortable prop="paramDesc"/>

            <!-- 操作的动作 -->
            <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
                <template slot-scope="{row,$index}">
                    <el-button type="warning" size="mini" icon="el-icon-edit">
                        编辑
                    </el-button>
                    <el-button size="mini" type="danger" icon="el-icon-delete" >
                        删除
                    </el-button>
                </template>
            </el-table-column>

        </el-table>

        <!-- 分页功能 -->
        <Pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="queryList" />

        <!-- 弹窗 -->
        <!--<el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible">
            <el-form ref="dataForm" :rules="rules" :model="rowData" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
                <el-form-item label="ID" prop="id" v-if="dialogStatus==='更新'">
                    <el-input v-model="rowData.id" disabled/>
                </el-form-item>
                <el-form-item label="月份" prop="month">
                    <el-date-picker v-model="rowData.month" type="month" placeholder="选择月份"/>
                </el-form-item>
                <el-form-item label="开始日期" prop="startDate">
                    <el-date-picker v-model="rowData.startDate" type="date" placeholder="选择开始日期"/>
                </el-form-item>
                <el-form-item label="结束日期" prop="endDate">
                    <el-date-picker v-model="rowData.endDate" type="date" placeholder="选择结束日期"/>
                </el-form-item>
                <el-form-item label="备注" prop="memo">
                    <el-input type="textarea" v-model="rowData.memo" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">
                    取消
                </el-button>
                <el-button type="primary">
                    提交
                </el-button>
            </div>
        </el-dialog>-->

    </div>
</template>

<script>
    import {Component, Vue } from 'vue-property-decorator'
    import Pagination from "../../components/Pagination/Pagination";

    @Component({
        components: {Pagination}
    })
    export default class Parameter extends Vue{
        parameter = 'Parameter'
        paramId = ''
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
            this.listLoading = false
            this.tableData = [
                {id:1,paramId:'test1',paramValue:'2020-01-13',paramDesc:'项目初始时间'},
                {id:2,paramId:'test1',paramValue:'2020-01-13',paramDesc:'项目初始时间'},
                {id:3,paramId:'test1',paramValue:'2020-01-13',paramDesc:'项目初始时间'},
                {id:4,paramId:'test1',paramValue:'2020-01-13',paramDesc:'项目初始时间'},
                {id:5,paramId:'test1',paramValue:'2020-01-13',paramDesc:'项目初始时间'},
                {id:6,paramId:'test1',paramValue:'2020-01-13',paramDesc:'项目初始时间'},
                {id:7,paramId:'test1',paramValue:'2020-01-13',paramDesc:'项目初始时间'},
                {id:8,paramId:'test1',paramValue:'2020-01-13',paramDesc:'项目初始时间'},
            ]
            this.total = this.tableData.length
            this.listLoading = false
        }

    }
</script>

<style scoped>

</style>
