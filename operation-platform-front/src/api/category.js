import service from '@/utils/service'

const baseUrl = '/api/admin/category'

const categoryApi = {}

categoryApi.listAll = () => {
  return service({
    url: `${baseUrl}/all`,
    method: 'get'
  })
}

categoryApi.listAllByPage = (pageParam) => {
  return service({
    url: `${baseUrl}/page/all`,
    method: 'get',
    params: pageParam
  })
}

categoryApi.listTree = () => {
  return service({
    url: `${baseUrl}/tree_view`,
    method: 'get'
  })
}

categoryApi.create = category => {
  return service({
    url: `${baseUrl}/save`,
    data: category,
    method: 'post'
  })
}

categoryApi.delete = categoryId => {
  return service({
    url: `${baseUrl}/${categoryId}`,
    method: 'delete'
  })
}

categoryApi.get = categoryId => {
  return service({
    url: `${baseUrl}/${categoryId}`,
    method: 'get'
  })
}

categoryApi.update = (categoryId, category) => {
  return service({
    url: `${baseUrl}/${categoryId}`,
    data: category,
    method: 'put'
  })
}

function concreteTree (parentCategory, categories) {
  categories.forEach(category => {
    if (parentCategory.key === category.parentId) {
      if (!parentCategory.children) {
        parentCategory.children = []
      }
      parentCategory.children.push({
        key: category.id,
        title: category.name,
        isLeaf: false
      })
    }
  })

  if (parentCategory.children) {
    parentCategory.children.forEach(category => concreteTree(category, categories))
  } else {
    parentCategory.isLeaf = true
  }
}

categoryApi.concreteTree = categories => {
  const topCategoryNode = {
    key: 0,
    title: 'top',
    children: []
  }
  concreteTree(topCategoryNode, categories)
  return topCategoryNode.children
}

export default categoryApi
