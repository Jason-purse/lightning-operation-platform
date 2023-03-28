import service from '@/utils/service'

const baseUrl = '/api/admin/tag'

const tagApi = {}

tagApi.listAll = () => {
  return service({
    url: `${baseUrl}/all`,
    method: 'get'
  })
}

tagApi.listAllByPage = pageParam => {
  return service({
    url: `${baseUrl}/page/all`,
    method: 'get'
  })
}

tagApi.createWithName = name => {
  return service({
    url: `${baseUrl}/save`,
    data: {
      name: name
    },
    method: 'post'
  })
}

tagApi.create = tag => {
  return service({
    url: `${baseUrl}/save`,
    data: tag,
    method: 'post'
  })
}

tagApi.update = (tagId, tag) => {
  return service({
    url: `${baseUrl}/${tagId}`,
    data: tag,
    method: 'put'
  })
}

tagApi.delete = tagId => {
  return service({
    url: `${baseUrl}/${tagId}`,
    method: 'delete'
  })
}

export default tagApi
