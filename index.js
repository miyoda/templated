#!/usr/bin/env node

function run() {
    console.log("templated-npm running...")
    let path = require('path')
    let config = require(path.resolve('templated.json'))
    console.log("templated-npm config: "+JSON.stringify(config))

    let sources = config.sources || []
    if (config.source) sources.push(config.source)
    
    sources.forEach(source => {
        runSource(source)
    });
    
}

function runSource(source) {
    
}

module.exports = {
    run: run
}