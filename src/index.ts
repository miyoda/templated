import * as path from 'path'
import * as fs from 'fs'

export function run () {
  console.log('templated-npm running...')
  const config = require(path.resolve('templated.json'))
  console.log('templated-npm config: ' + JSON.stringify(config))

  const sources: string[] = config.sources || []
  if (config.source) sources.push(config.source)

  for (let source of sources) {
    runTemplated(path.resolve(source), path.resolve('.'))
  }
}

function runTemplated (moveFrom: string, moveTo: string) {
  let files = fs.readdirSync(moveFrom)
  for (let file of files) {
    let fromPath = path.join(moveFrom, file)
    let toPath = path.join(moveTo, file)
    runTemplatedFile(fromPath, toPath)
  }
}

function runTemplatedFile (fromPath: string, toPath: string) {
  if (!isIgnored(fromPath)) {
    const stats = fs.statSync(fromPath)
    if (stats.isFile()) {
      if (fromPath.endsWith('.part')) {
        console.log('.part ', fromPath, toPath)
        const divisor = fromPath.indexOf('|')
        const tag = fromPath.substring(divisor + 1, fromPath.length - '.part'.length)
        runTemplatedPart(fromPath, toPath.substring(0, toPath.lastIndexOf('|')), tag)
      } else {
        console.log('link ',fromPath, toPath)
        fs.unlinkSync(toPath)
        fs.linkSync(fromPath, toPath)
      }
    } else {
      try {
        fs.mkdirSync(toPath)
      } catch (e) {
        // unnecesary
      }
      runTemplated(fromPath, toPath)
    }
  }
}

function runTemplatedPart (fromPath: string, toPath: string, tag: string) {
  // const fileExt = fromPath.substring(fromPath.lastIndexOf('.')+1)
  // TODO diferent by fileExt
  replacePart(fromPath, toPath, '<!-- start|' + tag + ' -->', '<!-- end|' + tag + ' -->', tag)
}

function replacePart (fromPath: string, toPath: string, startTag: string, endTag: string, tagName: string) {
  let fromData = fs.readFileSync(fromPath).toString()
  let toData = fs.readFileSync(toPath).toString()
  let startIndex = toData.indexOf(startTag) + startTag.length
  let endIndex = toData.indexOf(endTag, startIndex)
  let toDataResult = undefined
  if (startIndex !== -1 && endIndex !== -1) {
    toDataResult = toData.substring(0, startIndex) + fromData + toData.substring(endIndex)
  } else if (tagName === 'start') {
    toDataResult = startTag + fromData + endTag + toData
  } else if (tagName === 'end') {
    toDataResult = toData + startTag + fromData + endTag
  } else {
    console.error('tag not found: ' + tagName + ' on file ' + toPath)
  }
  if (toDataResult) {
    fs.writeFileSync(toPath, toDataResult)
  }
}

function isIgnored (filePath: string): boolean {
  return filePath.endsWith('.git')
}
