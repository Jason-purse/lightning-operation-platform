function resetFormFields (_, formName = 'form') {
  formName = formName || 'form'
  this[formName]?.resetFields()
}

export default {
  data () {
    return {
      form: null,
      tableData: [],
      pagination: {
        page: 1,
        size: 0,
        total: 0,
        defaultPageSize: 10,
        defaultCurrent: 1
      }
    }
  },
  methods: {
    resetFormFields,

    hasErrors (_ = '', formName = 'form') {
      formName = formName || 'form'
      const errors = this[formName]?.getFieldsError()
      return Object.keys(errors).some(field => errors[field])
    },

    hasBlanks (_ = '', formName = 'form') {
      formName = formName || 'form'
      const values = this[formName]?.getFieldsValue()
      if (values) {
        return Object.values(values).filter(ele => !ele).length > 0
      }
      return false
    },
    /**
     * 提交表单
     * @param formName 表单名称
     * @param _ 事件
     */
    submitForm (_ = '', formName = 'form') {
      formName = formName || 'form'

      // 成功做事情 ..
      this.getDataFunc && this.getDataFunc(this.$form).then(({ data }) => {
        this.tableData = data
      })
    }
  }
}
