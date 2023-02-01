/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import fs from 'fs'
import path from 'path'

export default ({ content }) => <p>{content}</p>

export async function getStaticProps() {
  const content = fs.readFileSync(
    path.join(process.cwd(), './test/remote/foo.txt'),
    'utf8'
  )
  return {
    props: { content },
  }
}
