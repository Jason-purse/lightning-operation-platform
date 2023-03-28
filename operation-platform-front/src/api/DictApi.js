import modelMixin from '../mixin/model-mixin'
import getApiCommonFunctions from '@/api/baseApiConfig'

const apiName = 'dict'
const apiCommonFunctions = getApiCommonFunctions(apiName)

// 获取dict
export default {
  data () {
    return {
      ...modelMixin.data()
    }
  },
  methods: {
    ...modelMixin.methods,
    getDictInfoById (id) {
      return apiCommonFunctions.getByIdFunc(id)
    },
    //  获取 dictInfos by parent dict
    getDictInfosOfParentDict (fItemType) {
      return apiCommonFunctions.getListFunc({
        strategyKey: 'search',
        fItemType
      })
    }
  }
}
