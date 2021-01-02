<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input v-model="tradeNo" style="width: 15%" placeholder="请输入交易号"/>
            <el-button type="primary" icon="el-icon-search">查询</el-button>
        </div>
        <el-table
                :data="tableData"
                border
                fit
                highlight-current-row
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="ID"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="full_name"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="owner.avatar_url"
                    label="地址"
                    width="180"
                    show-overflow-tooltip
                    resizable>
                <template slot-scope="{row}">
                    <a :href="row.owner.avatar_url" target="_blank" class="link-type">{{ row.owner.avatar_url }}</a>
                </template>
            </el-table-column>
            <el-table-column label="Author" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.name }}</span>
                </template>
            </el-table-column>

            <!-- 操作的动作 -->
            <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
                <template slot-scope="{row,$index}">
                    <el-button type="primary" size="mini" @click="handleUpdate(row)">
                        Edit
                    </el-button>
                    <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
                        Delete
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页功能 -->
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

        <!-- 弹窗 -->
        <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible">
            <el-form ref="dataForm" :rules="rules" :model="rowData" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
                <el-form-item label="ID" prop="id" v-if="dialogStatus==='更新'">
                    <el-input v-model="rowData.id" />
                </el-form-item>
                <el-form-item label="日期" prop="timestamp">
                    <el-date-picker v-model="rowData.timestamp" type="datetime" placeholder="Please pick a date" />
                </el-form-item>
                <el-form-item label="全名" prop="full_name">
                    <el-input v-model="rowData.full_name" />
                </el-form-item>
                <el-form-item label="个人主页" prop="owner.avatar_url">
                    <el-input v-model="rowData.owner.avatar_url" style="margin-top:8px;" />
                </el-form-item>
                <el-form-item label="名称" prop="name">
                    <el-input v-model="rowData.name" placeholder="Please input" />
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
    import Pagination from '@/components/Pagination/Pagination'
    import {fetchList} from "@/api/article";
    export default {
        name: "TestTable",
        data(){
            return {
                tradeNo:'',
                total:0,
                tableData: [],
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
                    type: [{ required: true, message: 'type is required', trigger: 'change' }],
                    timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
                    title: [{ required: true, message: 'title is required', trigger: 'blur' }]
                },
                rowData:{
                    id: '',
                    full_name:'',
                    owner: {avatar_url: ''},
                    name: ''
                }


            }
        },
        mounted(){
          this.getList();
        },
        methods:{
            // 查询
            getList() {
                this.listLoading = true
                fetchList(this.listQuery).then(response => {
                    this.tableData = response.items
                    this.total = response.total_count
                })
            },
            // 删除功能
            handleDelete(row, index) {
                this.$notify({
                    title: 'Success',
                    message: '删除成功',
                    type: 'success',
                    duration: 2000
                })
                this.tableData.splice(index, 1)
            },
            // 修改功能
            handleUpdate(row){
                // copy obj
                this.rowData = Object.assign({}, row)
                this.rowData.timestamp = new Date()
                this.dialogStatus = '更新'
                this.dialogFormVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            }
        },
        components:{
            Pagination
        }
    }
</script>

<style scoped>

</style>
