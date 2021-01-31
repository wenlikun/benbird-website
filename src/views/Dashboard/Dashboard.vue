<template>
    <div class="dashboard-editor-container">
        <div>
            Hello {{name}}
        </div>
        <div>
            {{date}}
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Moment from 'moment'

    export default {
        name: 'Dashboard',
        data(){
            return {
                Dashboard:'Dashboard',
                date : ''
            }
        },
        mounted(){
          setInterval( () =>　{
            this.date = Moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
          },1000)
        },
        computed: {
            ...mapGetters(['name']),
        }
    }
</script>

<style lang="scss" scoped>
    .dashboard-editor-container {
        padding: 32px;
        background-color: rgb(240, 242, 245);
        position: relative;

        .github-corner {
            position: absolute;
            top: 0px;
            border: 0;
            right: 0;
        }

        .chart-wrapper {
            background: #fff;
            padding: 16px 16px 0;
            margin-bottom: 32px;
        }
    }

    @media (max-width:1024px) {
        .chart-wrapper {
            padding: 8px;
        }
    }
</style>
