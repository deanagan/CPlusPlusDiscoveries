new Vue({
    el: '.lambdasyntax',
    data : {
        codesamples : [
            replaceDoubleSpaceStrings(`// Minimal lambda
            auto fn = [] { };`),
            replaceDoubleSpaceStrings(`auto fn = [] /* the square bracket is a "lambda introducer" */
            { };`),
            replaceDoubleSpaceStrings(`auto fn = [/*anything that goes here is a "capture"*/] { };`),
            replaceDoubleSpaceStrings(`auto fn = [/*"capture"*/]
            /* Everything in between is optional:
             (...) mutable throwSpec -> retType */
            { /* body */ };`),
            replaceDoubleSpaceStrings(`// A lambda can have a parameter specified in parentheses.
            // This is also called a lambda declarator.
            auto fn = [](const string& name)
            { cout << "Hello, " << name; };`),
        ]
    }
})
