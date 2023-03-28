const apiContextPath = process.env.VUE_APP_BASE_API + "/admin/" + process.env.VUE_APP_API_VERSION
import request from '@/utils/service'

function getApiCommonEndpoints(apiName) {
  return {
    getList: apiContextPath + `/${apiName}/list`,
    getById: apiContextPath,
    add: apiContextPath + `/${apiName}`,
    update: apiContextPath,
    deleteById: apiContextPath,
    delete: apiContextPath + `/${apiName}/criteria`
  };
}

export default function getApiCommonFunctions(apiName) {
  let apiCommonEndpoints = getApiCommonEndpoints(apiName);

  return {
    getListFunc(params) {
      return request.get(apiCommonEndpoints.getList, {params})
    },
    getByIdFunc(id) {
      return request.get(apiCommonEndpoints.getById, {params: {id}})
    },
    addFunc(data) {
      return request.post(apiCommonEndpoints.add, {data})
    },
    deleteFunc(params) {
      return request.delete(apiCommonEndpoints.delete, {params})
    },
    deleteByIdFunc(id) {
      return request.delete(apiCommonEndpoints.deleteById, {params: {id}})
    },
    updateFunc(data) {
      return request.put(apiCommonEndpoints.update, {data})
    },
    getDataFunc(form = 'form') {
      form = form || 'form'
      // 获取数据信息 并返回
      return this.getListFunc(this[form])
    }
  }
}

