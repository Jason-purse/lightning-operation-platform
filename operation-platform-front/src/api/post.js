import service from '@/utils/service'

const baseUrl = '/api/admin/post'

const postApi = {}

postApi.listLatest = top => {
  return service({
    url: `${baseUrl}/latest`,
    params: {
      top: top
    },
    method: 'get'
  })
}
/**
 * 获取任何状态的文章
 * @param pageParams
 * @returns {AxiosPromise}
 */
postApi.listAll = pageParams => {
  return service({
    url: `${baseUrl}/page/all`,
    params: pageParams,
    method: 'get'
  })
}

postApi.query = params => {
  return service({
    url: baseUrl,
    params: params,
    method: 'get'
  })
}

postApi.get = postId => {
  return service({
    url: `${baseUrl}/${postId}`,
    method: 'get'
  })
}

postApi.create = (postToCreate) => {
  return service({
    url: `${baseUrl}/save`,
    method: 'post',
    data: postToCreate
  })
}

postApi.update = (postToUpdate, autoSave) => {
  return service({
    url: baseUrl,
    method: 'put',
    data: postToUpdate,
    params: {
      autoSave: autoSave
    }
  })
}

postApi.updateDraft = (postId, content) => {
  return service({
    url: `${baseUrl}/status/draft`,
    method: 'put',
    data: {
      postId,
      content
    }
  })
}

postApi.updateStatus = (postId, postStatus) => {
  return service({
    url: `${baseUrl}/${postId}/status/${postStatus}`,
    method: 'put'
  })
}

postApi.updateStatusInBatch = (ids, status) => {
  return service({
    url: `${baseUrl}/status/${status}`,
    data: ids,
    method: 'put'
  })
}

postApi.delete = postId => {
  return service({
    url: `${baseUrl}/${postId}`,
    method: 'delete'
  })
}

postApi.deleteInBatch = ids => {
  return service({
    url: `${baseUrl}`,
    data: ids,
    method: 'delete'
  })
}

postApi.preview = postId => {
  return service({
    url: `${baseUrl}/preview/${postId}`,
    method: 'get'
  })
}

postApi.postStatus = {
  PUBLISHED: {
    value: 'PUBLISHED',
    color: 'green',
    status: 'success',
    text: '已发布'
  },
  DRAFT: {
    value: 'DRAFT',
    color: 'yellow',
    status: 'warning',
    text: '草稿'
  },
  RECYCLE: {
    value: 'RECYCLE',
    color: 'red',
    status: 'error',
    text: '回收站'
  },
  INTIMATE: {
    value: 'INTIMATE',
    color: 'blue',
    status: 'success',
    text: '私密'
  }
}

postApi.permalinkType = {
  DEFAULT: {
    type: 'DEFAULT',
    text: '默认'
  },
  DATE: {
    type: 'DATE',
    text: '年月型'
  },
  DAY: {
    type: 'DAY',
    text: '年月日型'
  },
  ID: {
    type: 'ID',
    text: 'ID 型'
  }
}
export default postApi
