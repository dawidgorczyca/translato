const fs = require('fs')

const defaultPath = '.'

function prepareContent(content, config) {
  return JSON.stringify({ content, config, })
}

export default function createFile(config, content) {
  fs.writeFile(`${config.projectPath ? config.projectPath : defaultPath}/${config.projectFilename}.json`, prepareContent(content, config), (err) => {
    if (err) {
      return console.log(err)
    }

    console.log('The file was saved!')
  })
}
