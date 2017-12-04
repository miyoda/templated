"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
function run() {
    console.log('templated-npm running...');
    const config = require(path.resolve('templated.json'));
    console.log('templated-npm config: ' + JSON.stringify(config));
    const sources = config.sources || [];
    if (config.source)
        sources.push(config.source);
    for (let source of sources) {
        runTemplated(path.resolve(source), path.resolve('.'));
    }
}
exports.run = run;
function runTemplated(moveFrom, moveTo) {
    let files = fs.readdirSync(moveFrom);
    for (let file of files) {
        let fromPath = path.join(moveFrom, file);
        let toPath = path.join(moveTo, file);
        runTemplatedFile(fromPath, toPath);
    }
}
function runTemplatedFile(fromPath, toPath) {
    if (!isIgnored(fromPath)) {
        const stats = fs.statSync(fromPath);
        if (stats.isFile()) {
            if (fromPath.endsWith('.part')) {
                console.log('.part ', fromPath, toPath);
                const divisor = fromPath.indexOf('|');
                const tag = fromPath.substring(divisor + 1, fromPath.length - '.part'.length);
                runTemplatedPart(fromPath, toPath.substring(0, toPath.lastIndexOf('|')), tag);
            }
            else {
                console.log('link ', fromPath, toPath);
                fs.unlinkSync(toPath);
                fs.linkSync(fromPath, toPath);
            }
        }
        else {
            try {
                fs.mkdirSync(toPath);
            }
            catch (e) {
                // unnecesary
            }
            runTemplated(fromPath, toPath);
        }
    }
}
function runTemplatedPart(fromPath, toPath, tag) {
    // const fileExt = fromPath.substring(fromPath.lastIndexOf('.')+1)
    // TODO diferent by fileExt
    replacePart(fromPath, toPath, '<!-- start|' + tag + ' -->', '<!-- end|' + tag + ' -->', tag);
}
function replacePart(fromPath, toPath, startTag, endTag, tagName) {
    let fromData = fs.readFileSync(fromPath).toString();
    let toData = fs.readFileSync(toPath).toString();
    let startIndex = toData.indexOf(startTag) + startTag.length;
    let endIndex = toData.indexOf(endTag, startIndex);
    let toDataResult = undefined;
    if (startIndex !== -1 && endIndex !== -1) {
        toDataResult = toData.substring(0, startIndex) + fromData + toData.substring(endIndex);
    }
    else if (tagName === 'start') {
        toDataResult = startTag + fromData + endTag + toData;
    }
    else if (tagName === 'end') {
        toDataResult = toData + startTag + fromData + endTag;
    }
    else {
        console.error('tag not found: ' + tagName + ' on file ' + toPath);
    }
    if (toDataResult) {
        fs.writeFileSync(toPath, toDataResult);
    }
}
function isIgnored(filePath) {
    return filePath.endsWith('.git');
}
//# sourceMappingURL=index.js.map