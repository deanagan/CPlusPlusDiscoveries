

function replaceDoubleSpaceStrings(str) {
    return str.replace(/  +/g, '')
}

function dedentStrUsing1stLineIndent(str) {
    var sstr = str.split("\n").slice(1)
    var leadingSpace = sstr[0].length - sstr[0].trimStart().length
    var newSstr = []
    sstr.forEach(function(entry) {
        newSstr.push(entry.slice(leadingSpace) + "\n")
    })
    return newSstr.join('')
}

function splitListInChunks(splittables, readchunk) {
    let newArr = [...splittables]
    let chunkSz = readchunk
    let splitLen = Math.floor(newArr.length/chunkSz)
    if ((newArr.length % chunkSz) > 0) {
        splitLen += 1
    }
    let splittedList = []
    for (const i of Array(splitLen).keys()) {
        splittedList.push(newArr.slice(i*chunkSz,(i*chunkSz+chunkSz)))
    }
    return splittedList
}