import modelMixin from "../mixin/model-mixin";
import getApiCommonFunctions from "@/api/baseApiConfig";

const apiName = "authority";
const apiCommonFunctions = getApiCommonFunctions(apiName)

/**
 * 放入混入
 */
export default {
  data() {
    return {
      ...modelMixin.data()
    }
  },
  methods: {
    ...modelMixin.methods,
    getListByModuleNameAndDesc(moduleName, desc) {
      return apiCommonFunctions.getListFunc({moduleName, desc})
    },
    getById(id) {
      return apiCommonFunctions.getByIdFunc(id)
    }
  }
}
