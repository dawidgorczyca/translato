import { deepCopy } from './helpers'
const fs = require('fs')

const defaultPath = '.'

function prepareContent(content, config) {
  const output = deepCopy({ content, config })
  output.config.languages = Object.assign({}, output.config.languages)
  return JSON.stringify(output)
}

export function createFile(config, content) {
  fs.writeFile(`${config.projectPath ? config.projectPath : defaultPath}/${config.projectFilename}.json`, prepareContent(content, config), (err) => {
    if (err) {
      return console.log(err)
    }
    console.log('The file was saved!')
  })
}
export function checkFile(path) {
  return fs.existsSync(path)
}
export function readFile(path) {
  return fs.readFileSync(path, 'utf8')
}
