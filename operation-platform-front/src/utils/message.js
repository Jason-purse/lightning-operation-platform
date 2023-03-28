export function tip (title, msg) {
  this.$notification['error']({
    message: title,
    description: msg
  })
}
