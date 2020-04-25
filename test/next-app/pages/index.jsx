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
