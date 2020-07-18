new Vue({
    el : '.lambdaGotchas',
    data : {
        gotchas : [
            {
                statement : "With lambda expressions, bound variables are captured at the time of declaration.",
                codes : [
                    dedentStrUsing1stLineIndent(`
                    int someNumber = 20;
                    auto someFn = [someNumber](int anotherNumber) {
                        return anotherNumber + someNumber;
                    };
                    someNumber = 12;
                    auto result = someFn(1); // result == 21 and not 13.`),
                ]
            },
            {
                statement : replaceDoubleSpaceStrings(`Capturing by reference or capturing by value of a pointer in lambdas
                that will be used nonlocally, including returned, stored on the heap, or passed to another thread may result in dangling pointers or references.`),
                codes : [
                    dedentStrUsing1stLineIndent(`
                    function<int(int)> GetModuloFn() {
                        auto number = 43;
                        return [&number] (int value) {
                            return value % number;
                        }; // ref to number will dangle!
                    }`),
                ]
            },
            {
                statement : 'A capture by value of a raw pointer may still dangle.',
                codes : [
                    dedentStrUsing1stLineIndent(`
                    struct Coordinate {
                        int xaxis { 1 };
                        int yaxis { 1 };
                    };

                    function<int(int)> GetSomeFn() {
                        auto pInter = new Coordinate;
                        auto fn = [=] (int value) {
                            return value % pInter->xaxis;  // dangle!
                        };
                        // .. more code here
                        delete pInter;
                        return fn;
                    }`),
                ]
            },
            {
                statement : 'Dangling also happens with out of scope "this" instances of an object that returns a lambda fn.',
                codes : [
                    dedentStrUsing1stLineIndent(`
                    struct Coordinate {
                        int xaxis { 1 };
                        int yaxis { 1 };

                        function<int(int)> Compute() {
                            return [this] (int value) { 
                                return value % this->xaxis; 
                            };
                        }
                    };

                    function<int(int)> GetSomeFn() {
                        Coordinate c;
                        return c.Compute(); // dangling! Out of scope capture.
                    }`)
                ]
            },
            {
                statement : "Avoid default capture modes.(Scott Meyer Effective Modern C++)",
                codes : [
                    dedentStrUsing1stLineIndent(`
                    int x;
                    ...
                    auto fn = [=] (int y) { return x*y;}; // OK
                    auto fn = [x] (int y) { return x*y;}; // Better
                    `)

                ]
            },
        ]
    }
})