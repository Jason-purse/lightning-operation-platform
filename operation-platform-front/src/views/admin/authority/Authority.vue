<template>
  <page-view>
    <div class="cp-container">
      <div class="search-line">
        <a-form layout="inline" :form="form" @submit="handleSubmit">
          <a-form-item :validate-status="userNameError() ? 'error' : ''" :help="userNameError() || ''">
            <a-input
              v-decorator="[
          'moduleName',
          { rules: [{ required: true, message: '请输入模块名称!' }] },
        ]"
              placeholder="请输入应用名称"
            >
              <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
            </a-input>
          </a-form-item>
          <a-form-item :validate-status="passwordError() ? 'error' : ''" :help="passwordError() || ''">
            <a-input
              v-decorator="[
          'description',
          { rules: [{ required: true, message: '请输入模块描述!' }] },
        ]"
              placeholder="请输入模块描述!"
            >
              <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-row :gutter="16">
              <a-col :span="12">
                <a-button type="primary" html-type="submit"
                          :disabled="hasErrors(event) || hasBlanks(event)">
                  查询
                </a-button>
              </a-col>
              <a-col :span="12">
                <a-button html-type="reset" @click="resetFormFields">重置</a-button>
              </a-col>
            </a-row>
          </a-form-item>
        </a-form>
      </div>
      <div class="data-view">
        <a-button class="editable-add-btn" @click="appDialogTrigger">
          新增app
        </a-button>
        <a-table :columns="columns" :data-source="data">
          <a slot="name" slot-scope="text">{{ text }}</a>
          <span slot="customTitle"><a-icon type="smile-o"/> Name</span>
          <span slot="tags" slot-scope="tags">
      <a-tag
        v-for="tag in tags"
        :key="tag"
        :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
      >
        {{ tag.toUpperCase() }}
      </a-tag>
      <template slot="operation" slot-scope="text, record">
          <a-popconfirm
            title="Sure to delete?"
            @confirm="() => onDelete(record.key)"
          >
            <a href="javascript:;">删除</a>
          </a-popconfirm>
      </template>
    </span>
          <span slot="action" slot-scope="text, record">
      <a>Invite 一 {{ record.name }}</a>
      <a-divider type="vertical"/>
      <a>Delete</a>
      <a-divider type="vertical"/>
      <a class="ant-dropdown-link"> More actions <a-icon type="down"/> </a>
    </span>
        </a-table>
        <div style="text-align: right; margin-top: 10px;">
          <a-pagination :hideOnSinglePage="true"
                        :defaultCurrent="pagination.defaultCurrent"
                        :defaultPageSize="pagination.defaultPageSize" v-model="pagination.page"
                        :total="pagination.total" show-less-items/>
        </div>
      </div>

      <!--      新增app-->
      <div class="add-app">
        <a-modal centered="true" v-model="appDialogBoxConfig.visible" :title="appDialogBoxConfig.dialogCurrentTitle"
                 @ok="handleAppDataOfDialog">
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </a-modal>
      </div>

    </div>
  </page-view>
</template>

<script>
import authorityApi from '@/api/authorityApi'
import PageView from '@/layouts/PageView.vue'
import dialog from 'ant-design-vue/lib/vc-dialog/Dialog'

export default {
  name: 'Authority',
  computed: {
    dialog () {
      return dialog
    }
  },
  components: { PageView },
  data () {
    return {
      ...authorityApi.data(),
      form: this.$form.createForm(this, { name: 'authority_search_form' }),
      appDialogBoxConfig: {
        visible: false,
        dialogCurrentTitle: '', // 弹窗当前标题
        dialogTitle: ['新增app', '更新app'],
        dialogIndex: 0, // dialog title index 设置为 对应的标题 index
        data: {} // 弹窗数据
      },
      columns: [
        {
          dataIndex: '名称',
          key: 'name',
          slots: { title: 'customTitle' },
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '原始应用ID',
          dataIndex: 'originAppId',
          key: 'originAppId'
        },
        {
          title: '描述',
          dataIndex: 'description',
          key: 'description'
        },
        {
          title: '类型',
          key: 'type',
          dataIndex: 'type',
          scopedSlots: { customRender: 'type' }
        },
        {
          title: '应用部署地址',
          key: 'url',
          scopedSlots: { customRender: 'url' }
        },
        {
          title: '创建时间',
          key: 'createAt'
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' }
        }
      ]
    }
  },
  created () {
    // 开始调用数据
    this.submitForm()
  },
  methods: {
    ...authorityApi.methods,
    // Only show error after a field is touched.
    userNameError () {
      const { getFieldError, isFieldTouched } = this.form
      return isFieldTouched('userName') && getFieldError('userName')
    },
    // Only show error after a field is touched.
    passwordError () {
      const { getFieldError, isFieldTouched } = this.form
      return isFieldTouched('password') && getFieldError('password')
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    // 新增并验证 ..
    // 表单数据
    validationAppDataWithAdd (formData) {

    },
    // 处理 弹窗的app 数据
    handleAppDataOfDialog () {

    },
    // 弹窗触发器 ..
    appDialogTrigger (_ = '', index = 0) {
      this.appDialogBoxConfig.dialogCurrentTitle = this.appDialogBoxConfig.dialogTitle[index]
      this.appDialogBoxConfig.visible = true
    }
  }

}
</script>

<style scoped lang="scss">
.cp-container {
  padding: 0 24px 0 24px;
}

.data-view {
  margin-top: 36px;
}
</style>
