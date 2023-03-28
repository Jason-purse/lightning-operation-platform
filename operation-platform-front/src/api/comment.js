import service from '@/utils/service'

const baseUrl = '/api/admin'

const commentApi = {}

commentApi.latestComment = (top, status) => {
  return service({
    url: `${baseUrl}/comments/latest`,
    params: {
      top: top,
      status: status
    },
    method: 'get'
  })
}

commentApi.queryComment = (params) => {
  return service({
    url: `${baseUrl}/comments/page/all`,
    params: params,
    method: 'get'
  })
}

commentApi.commentTree = (id, params) => {
  return service({
    url: `${baseUrl}/comments/${id}/tree_view`,
    params: params,
    method: 'get'
  })
}

commentApi.updateStatus = (commentId, status) => {
  return service({
    url: `${baseUrl}/comments/${commentId}/status/${status}`,
    method: 'put'
  })
}

commentApi.updateStatusInBatch = (ids, status) => {
  return service({
    url: `${baseUrl}/comments/status/${status}`,
    data: ids,
    method: 'put'
  })
}

commentApi.delete = (commentId) => {
  return service({
    url: `${baseUrl}/comments/${commentId}`,
    method: 'delete'
  })
}

commentApi.deleteInBatch = (ids) => {
  return service({
    url: `${baseUrl}/comments`,
    data: ids,
    method: 'delete'
  })
}

commentApi.create = (comment) => {
  return service({
    url: `${baseUrl}/comments`,
    data: comment,
    method: 'post'
  })
}

commentApi.update = (commentId, comment) => {
  return service({
    url: `${baseUrl}/comments/${commentId}`,
    data: comment,
    method: 'put'
  })
}

/**
 * Creates a comment.
 * @param {String} target
 * @param {Object} comment
 */
function createComment (comment) {
  return service({
    url: `${baseUrl}/comments`,
    method: 'post',
    data: comment
  })
}

// Creation api

commentApi.createPostComment = comment => {
  return createComment(comment)
}

/* commentApi.createSheetComment = comment => {
  return createComment(comment)
}

commentApi.createJournalComment = comment => {
  return createComment(comment)
} */

/* commentApi.createComment = (comment, type) => {
  if (type === 'sheet') {
    return commentApi.createSheetComment(comment)
  }

  if (type === 'journal') {
    return commentApi.createJournalComment(comment)
  }

  return commentApi.createPostComment(comment)
} */

commentApi.commentStatus = {
  PUBLISHED: {
    value: 'PUBLISHED',
    color: 'green',
    status: 'success',
    text: '已发布'
  },
  AUDITING: {
    value: 'AUDITING',
    color: 'yellow',
    status: 'warning',
    text: '待审核'
  },
  RECYCLE: {
    value: 'RECYCLE',
    color: 'red',
    status: 'error',
    text: '回收站'
  }
}

export default commentApi
