#! /usr/bin/env node

import { readFile, writeFile } from 'fs-promise'
import * as glob from 'glob'
import { template, templateSettings } from 'lodash'
import { basename, relative, resolve } from 'path'

async function main() {

  // use {{}} for templates
  templateSettings.interpolate = /{{([\s\S]+?)}}/g

  const isSimple = process.argv.includes('-s') || process.argv.includes('--simple')
  const name = basename(process.cwd())
  const folder = `${__dirname}/templates/${isSimple ? 'simple' : 'full'}`
  const files = glob.sync(`${resolve(folder)}/**/*`, { ignore: ['.DS_Store', 'node_modules', '*.js', '*.map', '*.d.ts'] })

  // check if folder has contents
  if (glob.sync(`${process.cwd()}/*`).length) {
    throw new Error('Aborting! Please empty the current directory')
  }

  console.log('')
  console.log('----------')
  console.log('- tsinit -')
  console.log('----------')
  console.log('')
  console.log(`Mode: ${isSimple ? 'simple' : 'full'}`)
  console.log(`Name: ${name}`)
  console.log('---------')
  console.log('')

  Promise
    .all(files.map(async filename => {
      const contents = template(await readFile(filename, 'utf-8'))({ name })
      const newFilename = relative(folder, filename)
      await writeFile(`${process.cwd()}/${newFilename}`, contents, 'utf-8')
      console.log(`Wrote ${newFilename}`)
    }))
    .then(() => {
      console.log(`Generated project ${name}!`)
    })

}

main()
