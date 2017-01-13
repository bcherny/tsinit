import { readFile, writeFile } from 'fs-promise'
import * as glob from 'glob'
import { template, templateSettings } from 'lodash'
import { basename, relative, resolve } from 'path'

async function main() {

  // use {{}} for templates
  templateSettings.interpolate = /{{([\s\S]+?)}}/g

  const isSimple = process.argv.includes('-s') || process.argv.includes('--simple')
  const name = basename(process.cwd())
  const folder = resolve(`${__dirname}/templates/${isSimple ? 'simple' : 'full'}`)
  const files = glob.sync(`${folder}/**/*`)

  Promise
    .all(files.map(async filename => {
      const contents = template(await readFile(filename, 'utf-8'))({ name })
      const newFilename = relative(__dirname, filename)
      await writeFile(`${process.cwd()}/${newFilename}`, contents, 'utf-8')
      console.log(`Wrote ${newFilename}`)
    }))
    .then(() => {
      console.log(`Generated project ${name}!`)
    })

}

main()