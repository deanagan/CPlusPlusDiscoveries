

var whySTL = new Vue({
    el: '.whyUseStl',
    data: {
        whys : [ 'It is well tested and optimised.',
                  'Don\'t reinvent the wheel.',
                  'It leads to shorter more compact code.'
        ]
    }
});

var coverage = new Vue({
    el: '.coverage',
    data: {
        topcoverage : [
            'Why use STL and what is its approach',
            'STL Containers',
            'Example Algorithm: std::find_if',
            'Discovering Lambdas',
            'Iterators',
            'Example Refactorings to Use Algorithms'
        ],

        lambdacoverage : [
            'Syntax',
            'Captures',
            'Mutable',
            'Gotchas'
        ]
    }
});

var stlApproach = new Vue({
    el: '.stlapproach',
    data: {
        approaches : [
            'There are more free functions instead of member functions ( e.g. std::find(container..) instead of container.find() ).',
            'Algorithms are designed to work for most containers.',
            'Algorithms work with iterators.',
        ]
    }

});

var choosingcontainer = new Vue({
    el: '.choosingcontainer',
    data: {
        baseurl : 'https://en.cppreference.com/w/cpp/container/',
        containers: [
            { name: "vector", descriptions: [
                "A dynamic array, capable of random access.",
                "Requires contiguous memory.",
                "Resizes itself when inserting or erasing an object.",
                "Inserting to the back takes amortized constant time."
            ]},
            { name: "deque", descriptions: [
                "Also known as double ended queue.",
                "Allows fast insertion and deletion at both its beginning and its end.",
                "Elements are not stored contiguously, but rather individual allocated fixed sized arrays (typical implementation).",
                "Larger minimal memory cost than a vector.",
                "Unlike a vector, it does not involve copying of the existing elements to a new memory when expanding."

            ]},
            { name: "list", descriptions: [
                "Supports constant time insertion and removal of elements from anywhere in the container.",
                "Usually a doubly linked list.",
            ]},
            { name: "forward_list", descriptions: [
                "Supports constant time insertion and removal of elements from anywhere in the container.",
                "Implemented as singly-linked list.",
            ]},
            { name: "set", descriptions: [
                "An associative container that contains a sorted set of unique objects of type Key.",
                "Sorting is done using the key comparison function Compare",
                "Search, removal, and insertion operations have logarithmic complexity.",
                "The key is the value itself. Key is unique, unlike multiset.",
                "Sets are usually implemented as red-black trees.",
            ]},
            { name: "map", descriptions: [
                "Is a sorted(unlike unordered_map) associative container that contains key-value pairs with unique keys.",
                "A key is mapped to a value. Keys are unique, unlike multimap.",
                "Sorting is done using the key comparison function Compare",
                "Search, removal, and insertion operations have logarithmic complexity.",
            ]},
        ],
        pickingcontainer : {
            title: "Picking a Container",
            scenarios_and_picks: [
                {
                    Scene: "By Default.",
                    Pick: "Vector for smaller collections, Deque for growth efficiency."
                },
                {
                    Scene: "Need a C-like contiguous dynamic array.",
                    Pick: "Vector"
                },
                {
                    Scene: "Need to insert a new element at the front and back.",
                    Pick: "Deque"
                },
                {
                    Scene: "Need to insert a new element at the middle and/or merge collections without re-allocating memory or invalidating iterators and references.",
                    Pick: "List"
                },
                {
                    Scene: "Need to look up by key separate to the value.",
                    Pick: "Map"
                },
                {
                    Scene: "Need to look up by key as the value itself.",
                    Pick: "Set"
                },
                {
                    Scene: "Need to look up by key, allowing for duplicates.",
                    Pick: "Multimap and Multiset"
                },
            ]
        }
    }
});


var algosample = new Vue({
    el: '.algosample',
    data: {
        entries: [
            {
                heading : "Example Algorithm: std::find_if",
                subheading: "Finding the first odd number",

                code: [
                    replaceDoubleSpaceStrings(`std::vector<int> n { 2, 4, 6, 9, 10 };
                     auto result_iter = std::find_if(begin(n), end(n), ???);`)
                ]
            },

            {
                heading : "Before C++11, we had 2 common approaches",
                subheading: "Using a stand alone/free function",

                code: [
                    'bool IsOdd(int n) { return n % 2 != 0; }',
                    dedentStrUsing1stLineIndent(`
                    void printOdd() {
                        std::vector<int>::iterator it; // no auto yet!
                        it = std::find_if(n.begin(), n.end(), IsOdd);
                        if (it != n.end()) {
                            std::cout << *it;
                        }
                    }`)
                  ],
            },

            {
                heading : "Or using a function object or functor",
                subheading: "",

                code: [
                    dedentStrUsing1stLineIndent(`
                    struct IsOdd {
                        bool operator()(int n) const {
                            return n%2 != 0;
                        }
                    };`),
                    dedentStrUsing1stLineIndent(`
                    void printOdd() {
                        std::vector<int>::iterator it; // no auto yet!
                        IsOdd isOdd;
                        it = std::find_if(n.begin(), n.end(), isOdd);

                        if (it != n.end()) {
                          std::cout << *it;
                        }
                    }`)
                  ],
            },

            {
                heading : "With Modern C++(C++11 and beyond), we now have lambdas.",
                subheading: "C++14 and beyond has generic lambdas too!",

                code: [
                    dedentStrUsing1stLineIndent(`
                    void printOdd() {
                        auto it = std::find_if(begin(n), end(n), [] (int n) {
                            return n%2 != 0;
                        });

                        if (it != n.end()) {
                          std::cout << *it;
                        }
                    }`),

                  ],
            },

        ]
    }
})

var lambdaSyntax = new Vue({
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
            auto fn = [](const std::string& name)
            { std::cout << "Hello, " << name; };`),
        ]
    }
})


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
            let newArr = [...this.codeexp]
            let chunkSz = this.readchunk
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
    }
})

var mutableLambdas = new Vue({
    el : '.mutablelambdas',
    data : {
        mutablenotes : [
            {
                statement: "Lambdas are equivalent to const methods by default.",
                codes: [
                    dedentStrUsing1stLineIndent(`
                    // This lambda
                    auto productFn = [multiplier](int multiplicand) {
                        return multiplicand * multiplier;
                    };`),
                    dedentStrUsing1stLineIndent(`
                    // is equivalent to this functor:
                    struct Product {
                        public:
                            Product(int multiplier) : _multiplier(multiplier) {}
                            int operator()(int multiplicand) const
                            {
                                return multiplicand * multiplier;
                            }
                        private:
                            int _multiplier;
                    };`)
                ]
            },
            {
                statement : "Lambdas follows the same syntax rules for const-qualified methods.",
                codes : [
                    dedentStrUsing1stLineIndent(`
                    auto someFn = [someNumber](int anotherNumber) {
                        ++someNumber; // Bad! expression must be a modifiable lvalue
                        return anotherNumber + someNumber;
                    };`),
                    dedentStrUsing1stLineIndent(`
                    auto someFn = [someNumber](int anotherNumber) mutable {
                        ++someNumber; // Now good due to mutable.
                        return anotherNumber + someNumber;
                    };`)
                ]
            },

            {
                statement : "If it were a reference though, it will still work as someNumber is now external to the object, and does not alter the object state.",
                codes : [
                    dedentStrUsing1stLineIndent(`
                    auto someFn = [&someNumber](int anotherNumber) {
                        ++someNumber;
                        return anotherNumber + someNumber;
                    };`),
                    dedentStrUsing1stLineIndent(`
                    // Applies to pointers too!
                    auto someFn = [pSomeNumber](int anotherNumber) {
                        ++(*pSomeNumber);
                        return anotherNumber + *pSomeNumber;
                    };`)
                ]
            },
        ]
    }
})

var lambdaGotchas = new Vue({
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
                    std::function<int(int)> GetModuloFn() {
                        auto number = 43;
                        return [&number] (int value) {
                            return value % number;
                        }; // ref to someNumber will dangle!
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

                    std::function<int(int)> GetSomeFn() {
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

                        std::function<int(int)> Compute() {
                            return [this] (int value) { return value % this->xaxis; };
                        }
                    };

                    std::function<int(int)> GetSomeFn() {
                        Coordinate c;
                        return c.Compute(); // dangling! Out of scope capture.
                    }`)
                ]
            },
            {
                statement : "Prefer to not use default capture modes to easily spot what was captured and avoid dangling.(Scott Meyer Effective Modern C++)",
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