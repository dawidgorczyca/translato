const fs = require('fs')

const defaultPath = './'

export default function createFile(projectPath = defaultPath, filename, content) {
  console.log(filename)
  fs.writeFile(`${projectPath}/${filename}.json`, `{test: '${content}'}`, (err) => {
    if (err) {
      return console.log(err)
    }

    console.log('The file was saved!')
  })
}
