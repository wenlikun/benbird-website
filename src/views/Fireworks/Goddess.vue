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
            <el-table-column label="开始日期" align="center" width="250px" sortable prop="startDate" :formatter="handleStartDate"/>
            <el-table-column label="结束日期" align="center" width="250px" sortable prop="endDate" :formatter="handleEndDate"/>
            <el-table-column label="备注" align="center" show-overflow-tooltip prop="memo"/>

            <!-- 操作的动作 -->
            <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
                <template slot-scope="{row,$index}">
                    <el-button type="warning" size="mini" icon="el-icon-edit" @click="handleEdit(row)">
                        编辑
                    </el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(row.id)" icon="el-icon-delete" >
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
                    <el-date-picker v-model="rowData.month" :disabled="this.dialogStatus==='更新'" type="month" placeholder="选择月份" value-format="yyyy-MM"/>
                </el-form-item>
                <el-form-item label="日期范围" prop="daterange">
                    <el-date-picker v-model="rowData.daterange" type="daterange" placeholder="请选择日期范围"
                                    value-format="yyyy-MM-dd" format="yyyy-MM-dd"/>
                </el-form-item>
                <el-form-item label="备注" prop="memo">
                    <el-input type="textarea" v-model="rowData.memo" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">
                    取消
                </el-button>
                <el-button type="primary" @click="submitDate">
                    提交
                </el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import Pagination from "@/components/Pagination/Pagination";
    import {queryGoddessList,addGoddess,modifyGoddess,deleteGoddess} from '@/api/goddess'
    import Moment from 'moment'
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
                    month: [{ type:'string', required: true, message: '月份不能为空', trigger: 'blur' }],
                    daterange: [{ type: 'array', required: true, message: '日期范围不能为空'}],
                },
                rowData:{
                    id: '',
                    month:'',
                    startDate: '',
                    endDate: '',
                    memo: '',
                    daterange:[]
                },
            }
        },
        mounted(){
            this.queryData()
        },
        methods:{
            async queryData() {
                this.listLoading = true;
                await queryGoddessList({
                    month: this.month,
                    currentPage: this.listQuery.page,
                    pageCount: this.listQuery.limit
                }).then((response) => {
                    const {data} = response.data
                    this.tableData = data.results
                    this.total = data.totalSize
                }).catch((error) => {
                    this.$message.error(error.data.message);
                    this.tableData = []
                    this.total = 0
                })
                this.listLoading = false
            },
            handleQuery(){
                this.queryData()
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
                this.$set(this.rowData,'daterange',[Moment(row.startDate).format('YYYY-MM-DD'), Moment(row.endDate).format('YYYY-MM-DD')])
                this.dialogStatus = '更新'
                this.dialogFormVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },
            submitDate() {
                this.$refs.dataForm.validate(valid => {
                    if (valid) {
                        const {daterange} = this.rowData
                        this.rowData.startDate = daterange[0]
                        this.rowData.endDate = daterange[1]
                        if ('新增' === this.dialogStatus) {
                            addGoddess(this.rowData).then(() => {
                                this.$message({message: '新增数据成功!', type: 'success'});
                                this.dialogFormVisible = false
                                this.queryData()
                            }).catch((error) => {
                                this.$message.error(error.data.message);
                            })
                        } else {
                            modifyGoddess(this.rowData).then(() => {
                                this.$message({message: '修改数据成功!', type: 'success'});
                                this.dialogFormVisible = false
                                this.queryData()
                            }).catch((error) => {
                                this.$message.error(error.data.message);
                            })
                        }
                    }
                })

            },
            handleDelete(id){
                deleteGoddess(id,this.$store.state.user.name).then(() => {
                    this.$notify({
                        title: 'Success',
                        message: '删除成功',
                        type: 'success',
                        duration: 2000
                    })
                    this.queryData()
                }).catch(error => {
                    this.$message.error(error.data.message);
                })
            },
            // 重置表单数据
            resetRowData(){
                this.rowData= {
                        id: undefined,
                        month:Moment(new Date()).format('YYYY-MM'),
                        memo: ''
                }
            },
            handleStartDate(row,column){
                return Moment(row.startDate).format('YYYY-MM-DD')
            },
            handleEndDate(row,column){
                return Moment(row.endDate).format('YYYY-MM-DD')
            }
        }

    }
</script>

<style scoped>

</style>
