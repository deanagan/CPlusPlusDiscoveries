var captureRules = new Vue({
    el: '.capturerules',
    data : {
        readchunk : 4,
        codeexp : [
            {
                column1 : '[=]{};',
                column2 : 'Outer scope is passed to the lambda by value default.'
            },
            {
                column1 : '[&]{};',
                column2 : 'Outer scope is passed to the lambda by reference default.'
            },
            {
                column1 : '[&i]{};',
                column2 : 'Capture i by reference.'
            },
            {
                column1 : '[i]{};',
                column2 : 'Capture i by value.'
            },
            {
                column1 : '[&i, j]{};',
                column2 : 'Capture i by reference and capture j by value.'
            },
            {
                column1 : '[=, &i]{};',
                column2 : 'Outer scope is passed to the lambda by value default, except i is captured by reference.'
            },
            {
                column1 : '[&, i]{};',
                column2 : 'Outer scope is passed to the lambda by reference default, except i is captured by value.'
            },
            {
                column1 : '[&i, =]{};',
                column2 : 'Error! A value default can only appear at the beginning of a lambda capture list.'
            },
            {
                column1 : '[i, &]{};',
                column2 : 'Error! A reference default can only appear at the beginning of a lambda capture list.'
            },
            {
                column1 : '[&, &i]{};',
                column2 : 'Error! Not allowed when the default capture mode is by-reference.'
            },
            {
                column1 : '[&, this] {};',
                column2 : 'Equivalent to [&].'
            },
            {
                column1 : '[&, this, i]{};',
                column2 : 'Equivalent to [&, i].'
            },
            {
                column1 : '[=, *this]{};',
                column2 : 'Invalid syntax before C++17. Valid in C++17, captures enclosing by copy.'
            },
            {
                column1 : '[=, this] {};',
                column2 : 'Invalid Syntax before C++20. Valid in C++20. Equivalent to [=].'
            },
            {
                column1 : '[i, i] {};',
                column2 : 'Error! i repeated.'
            },
            {
                column1 : '[this, *this] {};',
                column2 : 'Error! Invalid Syntax. "this" repeated.'
            },
        ],
    },
    computed : {
        splitted() {
            return splitListInChunks(this.codeexp, this.readchunk)
        },
    }
})