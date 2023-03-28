<template>
    <div class="buckets">
      <a-card title="Buckets" :bordered="false"
              :bodyStyle="{ padding: '16px' }">
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col
                :md="8"
                :sm="24"
              >
                <a-form-item label="前缀：">
                  <a-input
                    v-model="queryParam.prefix"
                    @keyup.enter="handleQuery()"
                  />
                </a-form-item>
              </a-col>
              <a-col
                :md="8"
                :sm="24"
              >
                <a-form-item label="marker：">
                  <a-input
                    v-model="queryParam.marker"
                    @keyup.enter="handleQuery()"
                  />
                </a-form-item>
              </a-col>
              <a-col
                :md="8"
                :sm="24"
              >
              <span class="table-page-search-submitButtons">
                <a-button
                  type="primary"
                  @click="handleQuery()"
                >查询</a-button>
                <a-button
                  style="margin-left: 8px;"
                  @click="handleResetParam()"
                >重置</a-button>
              </span>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <div class="table-operator">
          <a href="javascript:;"
            @click="handleShowPostSettings(post)"
          >设置</a>
        </div>
      </a-card>
    </div>
</template>

<script>
const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    width: '150px',
    ellipsis: true,
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '地域',
    className: 'status',
    dataIndex: 'location',
    scopedSlots: { customRender: 'location' }
  },
  {
    title: '存储类型',
    dataIndex: 'storageClass',
    scopedSlots: { customRender: 'storageClass' }
  },
  {
    title: '创建时间',
    dataIndex: 'creationDate',
    scopedSlots: { customRender: 'creationDate' }
  },
  {
    title: '操作',
    width: '180px',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  name: 'BucketList'

}
</script>

<style scoped lang="stylus">
  .buckets
    height 100%

</style>
