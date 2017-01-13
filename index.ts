#! /usr/bin/env node

import { execSync } from 'child_process'
import { readFile, writeFile } from 'fs-promise'
import * as glob from 'glob'
import { template, templateSettings } from 'lodash'
import { basename, relative, resolve } from 'path'

async function main() {

  const startTime = new Date().getTime()

  // use {{}} for templates
  templateSettings.interpolate = /{{([\s\S]+?)}}/g

  const authorName = $('npm config get init.author.name') || $('git config user.name')
  const authorEmail = $('npm config get init.author.email') || $('git config user.email')
  const authorUsername = $('npm whoami')
  const license = $('npm config get init.license') || 'MIT'
  const year = new Date().getFullYear()

  const isSimple = process.argv.includes('-s') || process.argv.includes('--simple')
  const packageName = basename(process.cwd())
  const folder = `${__dirname}/templates/${isSimple ? 'simple' : 'full'}`
  const files = glob.sync(`${resolve(folder)}/**/*`, { ignore: ['.DS_Store', 'node_modules', '*.js', '*.map', '*.d.ts'] })

  // check for author info
  if (!authorName) console.log('⚠ Set a default name with "npm config set init.author.name yourname"')
  if (!authorEmail) console.log('⚠ Set a default email with "npm config set init.author.email youremail"')

  // check if folder has contents
  if (glob.sync(`${process.cwd()}/*`).length) {
    throw new Error('Aborting! Please empty the current directory')
  }

  console.log('')
  console.log('----------')
  console.log('- tsinit -')
  console.log('----------')
  console.log('')
  console.log('----------')
  console.log(`Mode: ${isSimple ? 'simple' : 'full'}`)
  console.log(`Author Name: ${authorName}`)
  console.log(`Author Email: ${authorEmail}`)
  console.log(`Package Name: ${packageName}`)
  console.log(`License: ${license}`)
  console.log('----------')
  console.log('')

  Promise
    .all(files.map(async filename => {
      const contents = template(await readFile(filename, 'utf-8'))({ authorEmail, authorName, authorUsername, license, packageName, year })
      const newFilename = relative(folder, filename)
      await writeFile(`${process.cwd()}/${newFilename}`, contents, 'utf-8')
      console.log(`Wrote ${newFilename}`)
    }))
    .then(() => {
      const endTime = new Date().getTime()
      console.log('')
      console.log(`Generated project "${packageName}" in ${endTime - startTime}ms!`)
      console.log('')
    })

}

main()

/**
 * Synchronously executes a shell command
 */
function $(command: string): string {
  return (execSync(command, { encoding: 'utf-8' }) as any as string).replace(/\n/g, '').trim()
}