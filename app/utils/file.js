const fs = require('fs')

const defaultPath = '.'

function prepareContent(content, config) {
  return JSON.stringify({ content, config, })
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
