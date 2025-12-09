/**
 * Copyright IBM Corp. 2020, 2023
 * SPDX-License-Identifier: MPL-2.0
 */

module.exports = function (path, event) {
  console.log('welcome from sync script')
  console.log('file effected: ', path)
  console.log('event: ', event)
}

if (require.main === module) {
  module.exports(process.argv[2], process.argv[3])
}
