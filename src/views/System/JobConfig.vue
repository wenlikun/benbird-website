<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input v-model="jobNo" style="width: 20%" placeholder="job编号"></el-input>
            <el-input v-model="jobClass" style="width: 20%" placeholder="job类名"></el-input>
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
            <el-table-column label="job编号" align="center" width="150px" sortable>
                <template slot-scope="{row}">
                    <span class="link-type">{{ row.jobNo }}</span>
                </template>
            </el-table-column>
            <el-table-column label="job类名" align="center" width="150px" sortable prop="jobClass"/>
            <el-table-column label="job描述" align="center" width="150px" sortable prop="jobDesc"/>
            <el-table-column label="运行时间" align="center" width="150px" sortable prop="corn"/>
            <el-table-column label="是否启用" align="center" width="150px" sortable prop="isEnable"/>
            <el-table-column label="job类型" align="center" width="130px" sortable prop="jobType"/>

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
    import Cookie from 'js-cookie'

    @Component({
        components: {Pagination}
    })
    export default class JobConfig extends Vue{
        parameter = 'JobConfig'
        jobNo = ''
        jobClass = ''
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
                {id:1,jobNo:'123456789',jobClass:'2020-01-13',jobDesc:'',corn:'',isEnable:'',jobType:'项目初始时间'},
            ]
            this.total = this.tableData.length
            this.listLoading = false
        }

    }
</script>

<style scoped>

</style>
