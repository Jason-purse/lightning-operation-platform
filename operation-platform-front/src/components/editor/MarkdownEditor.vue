<template>
  <div>
    <halo-editor
      :style="{fontFamily:'Courier New'}"
      ref="md"
      v-model="originalContentData"
      :boxShadow="false"
      :toolbars="toolbars"
      :ishljs="true"
      :autofocus="false"
      @imgAdd="handleAttachmentUpload"
      @save="handleSaveDraft"
    />
  </div>
</template>
<script>
import { toolbars } from '@/config/core/const'
import { haloEditor } from 'halo-editor'
import 'halo-editor/dist/css/index.css'
import attachmentApi from '@/api/attachment'

export default {
  name: 'MarkdownEditor',
  components: {
    haloEditor
  },
  props: {
    /**
     * 这是获取的原始内容,可以没有
     */
    originalContent: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      // 工具栏
      toolbars,
      // 原始内容
      originalContentData: ''
    }
  },
  watch: {
    originalContent (val) {
      // 实时监听原始内容
      this.originalContentData = val
    },
    originalContentData (val) {
      // 当内容发生改变的时候,通知另一个视图组件
      this.$emit('onContentChange', val)
    }
  },
  methods: {
    // 附件上传
    handleAttachmentUpload (pos, $file) {
      let formData = new FormData()
      // 名称为file
      formData.append('file', $file)
      // post请求
      attachmentApi.upload(formData).then(response => {
        let responseObject = response.data

        if (responseObject.status === 200) {
          // 拿到??
          let haloEditor = this.$refs.md
          // 然后在指定的位置添加图片Uri,加载图片
          haloEditor.$img2Url(pos, encodeURI(responseObject.data.path))
          this.$message.success('图片上传成功！')
        } else {
          this.$message.error('图片上传失败：' + responseObject.message)
        }
      })
    },
    // 保存草稿
    handleSaveDraft () {
      this.$emit('onSaveDraft')
    }
  }
}
</script>
