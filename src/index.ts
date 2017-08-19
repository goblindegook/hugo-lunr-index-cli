#!/usr/bin/env node

import * as yargs from 'yargs'
import { join } from 'path'
import { loadConfig } from './lib/config'
import { index } from './lib/index'

async function indexPath (path = '') {
  try {
    const config = await loadConfig(path)
    await index(config)
    console.log(`Index written to ${join(config.publishDir, config.params.lunrIndexFile)}.`)
  } catch (e) {
    console.error(`Error: ${e.message}.`)
  }
}

const argv = yargs
  .usage('$0 [path]')
  .version()
  .help()
  .argv

Promise.resolve(argv._[0]).then(indexPath)
