module.exports = function (path, event) {
  console.log('welcome from sync script')
  console.log('file effected: ', path)
  console.log('event: ', event)
}

if (require.main === module) {
  module.exports(process.argv[2], process.argv[3])
}
