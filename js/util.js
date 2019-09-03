

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