var captureRules = new Vue({
    el: '.capturerules',
    data : {
        readchunk : 2,
        codeexp : [
            {
                column1 : `
                            int i;
                            MyObject object;
                            [=]{
                                // Have copy of i
                                // Have copy of object
                            };
                          `,
                column2 : 'Outer scope is passed to the lambda by value default.'
            },
            {
                column1 : `
                            int i;
                            MyObject object;
                            [&]{
                                // Have reference of i
                                // Have reference of object
                            };
                          `,

                column2 : 'Outer scope is passed to the lambda by reference default.'
            },
            {
                column1 : `
                            int i;
                            MyObject object;
                            [&i]{
                                // Have reference of i
                                // No access to object
                            };
                          `,

                column2 : 'Capture i by reference.'
            },
            {
                column1 : `
                            int i;
                            MyObject object;
                            [i]{
                                // Have copy of i
                                // No access to object
                            };
                          `,

                column2 : 'Capture i by value.'
            },
            {
                column1 : `
                            int i;
                            MyObject object;
                            [&i, object]{
                                // Have reference of i
                                // Have copy of object
                            };
                          `,
                column2 : 'Capture i by reference and capture object by value.'
            },
            {
                column1 : `
                            int i;
                            MyObject object;
                            [=,&i]{
                                // Have reference of i
                                // Have copy of object
                            };
                          `,
                column2 : 'Outer scope is passed to the lambda by value default, except i is captured by reference.'
            },
            {
                column1 : `
                            int i;
                            MyObject object;
                            [&, i]{
                                // Have copy of i
                                // Have reference of object
                            };
                          `,
                column2 : 'Outer scope is passed to the lambda by reference default, except i is captured by value.'
            },
            {
                column1 : `
                            int i;
                            MyObject object;
                            [&i, =]{ /*Error!*/ };
                          `,

                column2 : 'Error! A value default can only appear at the beginning of a lambda capture list.'
            },
            {
                column1 : `
                            int i;
                            MyObject object;
                            [i, &]{ /*Error!*/ };
                          `,
                column2 : 'Error! A reference default can only appear at the beginning of a lambda capture list.'
            },
            {
                column1 : `
                            int i;
                            MyObject object;
                            [&, &i]{ /*Error!*/ };
                          `,
                column2 : 'Error! Not allowed when the default capture mode is by-reference.'
            },
            {
                column1 : `
                            int i;
                            MyObject object;
                            [&, this]{
                                // Have reference of i
                                // Have reference of object
                                // Have reference of
                                //   this pointer
                            };
                          `,
                column2 : 'Equivalent to [&].'
            },
            {
                column1 : `
                            int i;
                            MyObject object;
                            [&, this, i]{
                                // Have copy of i
                                // Have reference of object
                                // Have reference of
                                //   this pointer
                            };
                          `,
                column2 : 'Equivalent to [&, i].'
            },
            {
                column1 : `
                            int i;
                            MyObject object;
                            [=, *this]{
                                // Have copy of i
                                // Have copy of object
                                // Have copy of
                                //   enclosing instance
                            };
                          `,
                column2 : 'Invalid syntax before C++17. Valid in C++17, captures enclosing by copy.'
            },
            {
                column1 : `
                            int i;
                            MyObject object;
                            [=, this]{
                                // Have copy of i
                                // Have copy of object
                                // Have copy of
                                //   enclosing instance
                            };
                          `,
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