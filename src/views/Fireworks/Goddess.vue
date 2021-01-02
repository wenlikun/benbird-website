<template>
    <div class="app-container">
        <div class="filter-container">
            <el-date-picker
                    v-model="month"
                    type="month"
                    value-format="yyyy-MM"
                    placeholder="选择月份">
            </el-date-picker>
            <el-button type="primary" icon="el-icon-search" @click="handleQuery">查询</el-button>
            <el-button type="success" icon="el-icon-plus" @click="handleAdd">新增</el-button>
        </div>

        <el-table
                :data="tableData"
                v-loading="listLoading"
                border
                fit
                highlight-current-row
                style="width: 100%">
            <el-table-column label="ID" align="center" width="70px" sortable prop="id"/>
            <el-table-column label="月份" align="center" width="150px" sortable prop="month"/>
            <el-table-column label="开始日期" align="center" width="250px" sortable prop="startDate"/>
            <el-table-column label="结束日期" align="center" width="250px" sortable prop="endDate"/>
            <el-table-column label="备注" align="center" show-overflow-tooltip prop="memo"/>

            <!-- 操作的动作 -->
            <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
                <template slot-scope="{row,$index}">
                    <el-button type="warning" size="mini" icon="el-icon-edit" @click="handleEdit(row)">
                        编辑
                    </el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(row,$index)" icon="el-icon-delete" >
                        删除
                    </el-button>
                </template>
            </el-table-column>

        </el-table>

        <!-- 分页功能 -->
        <Pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="queryData" />

        <!-- 弹窗 -->
        <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible">
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
        </el-dialog>

    </div>
</template>

<script>
    import Pagination from "@/components/Pagination/Pagination";
    export default {
        name: "Goddess",
        components:{Pagination},
        data(){
            return {
                month:'',
                tableData:[],
                total:0,
                listLoading: true,
                listQuery: {
                    page: 1,
                    limit: 20,
                    importance: undefined,
                    title: undefined,
                    type: undefined,
                    sort: '+id'
                },
                // 新增+更新
                dialogStatus: '',
                dialogFormVisible:false,
                rules: {
                    month: [{ type:'month', required: true, message: '月份不能为空', trigger: 'blur' }],
                    startDate: [{ type: 'date', required: true, message: '开始日期不能为空', trigger: 'blur' }],
                    endDate: [{ type: 'date', required: true, message: '结束日期不能为空', trigger: 'blur' }],
                },
                rowData:{
                    id: '',
                    month:'',
                    startDate: '',
                    endDate: '',
                    memo: ''
                }
            }
        },
        mounted(){
            this.queryData()
        },
        methods:{
            queryData(){
                this.listLoading = true
                this.total = 21
                this.tableData = [
                    {id:1,month:'2020-01',startDate:'2020-01-13',endDate:'2020-01-20',memo:'感觉还行'},
                    {id:2,month:'2020-02',startDate:'2020-02-13',endDate:'2020-02-20',memo:'感觉还行'},
                    {id:3,month:'2020-03',startDate:'2020-03-13',endDate:'2020-03-20',memo:'感觉还行'},
                    {id:4,month:'2020-04',startDate:'2020-04-13',endDate:'2020-04-20',memo:'感觉还行'},
                    {id:5,month:'2020-05',startDate:'2020-05-13',endDate:'2020-05-20',memo:'感觉还行'},
                    {id:6,month:'2020-06',startDate:'2020-06-13',endDate:'2020-06-20',memo:'感觉还行'},
                    {id:7,month:'2020-07',startDate:'2020-07-13',endDate:'2020-07-20',memo:'感觉还行'},
                    {id:8,month:'2020-08',startDate:'2020-08-13',endDate:'2020-08-20',memo:'感觉还行'},
                    {id:9,month:'2020-09',startDate:'2020-09-13',endDate:'2020-09-20',memo:'感觉还行'},
                    {id:10,month:'2020-10',startDate:'2020-10-13',endDate:'2020-10-20',memo:'感觉还行'},
                    {id:11,month:'2020-11',startDate:'2020-11-13',endDate:'2020-10-20',memo:'感觉还行11111111'},
                ]
                this.listLoading = false
            },
            handleQuery(){
                const month = this.month
                this.queryData()
                if(month){
                    this.tableData =  this.tableData.filter(date => date.month === month)
                }
            },
            handleAdd(){
                this.resetRowData()
                this.dialogStatus = '新增'
                this.dialogFormVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },
            handleEdit(row){
                // copy obj
                this.rowData = Object.assign({}, row)
                this.dialogStatus = '更新'
                this.dialogFormVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },
            handleDelete(row,index){
                this.$notify({
                    title: 'Success',
                    message: '删除成功',
                    type: 'success',
                    duration: 2000
                })
                this.tableData.splice(index, 1)
            },
            // 重置表单数据
            resetRowData(){
                this.rowData= {
                        id: undefined,
                        month:new Date(),
                        startDate: new Date(),
                        endDate: new Date(),
                        memo: ''
                }
            }
        }

    }
</script>

<style scoped>

</style>
