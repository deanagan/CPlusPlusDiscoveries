

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
            return splitListInChunks(this.codeexp, this.readchunk)
        },
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


var iteratorDescriptions = new Vue({
    el: '.iteratorDescriptions',
    data: {
        descriptions : [
            'Are concepts of an object that represents positions of elements in a container.',
            'Not a pointer but rather, a generalization of a pointer, thus a pointer is an iterator but an iterator is not neccesarily a pointer.\
            e.g. an iterator to a graph or tree is much more than a pointer.',
            'Iterators share the same interface but have different types.',
        ]
    }

})


var iteratorFunctions = new Vue({
    el: '.iteratorFunctions',
    data: {
        funcs : [
            {
                name : "begin/end",
                drawing : 'img/begin-end-iter.png',
                descriptions : [
                "begin represents the beginning of the elements in the container.",
                "end represents the position after the last element, a past-the-end iterator.",
                "cbegin/cend for constant iterator."
                ],
                note: "In modern C++, free function begin/end are preferred over member functions since they work on C-arrays too. i.e. begin(v) over v.begin()",
            },
            {
                name : "rbegin/rend",
                drawing : 'img/rbegin-rend-iter.png',
                descriptions : [
                "rbegin represents the last element in the container.",
                "rend represents the position before the first element in the container."
                ]
            },
            {
                name : "advance",
                descriptions : [
                'Advances iterator based on argument n.',
                'Modifies its argument and returns nothing.',
                'Does not check when it crosses end() which may cause undefined behavior.'
                ],
                sample: dedentStrUsing1stLineIndent(`
                std::vector<int> v{ 3, 1, 4 };
                auto vi = v.begin(); // *vi == 3
                std::advance(vi, 2); // *vi == 4
                `)
            },
            {
                name : "next",
                descriptions : [
                'Advances iterator based on argument n.',
                'Unlike advance, argument is unmodified.',
                'Returns a copy of the argument advanced by n.',
                'Does not check when it crosses end() which may cause undefined behavior.'
                ],
                sample: dedentStrUsing1stLineIndent(`
                std::vector<int> v{ 3, 1, 4 };

                auto it = v.begin(); // *it == 3
                auto nx = std::next(it, 2); // *nx == 4
                `)
            },

            {
                name : "prev",
                descriptions : [
                'Decrements iterator based on argument n.',
                'Returns a copy of the argument decremented by n.',
                "Doesn't check if it's past begin() and may result in undefined behavior."
                ],
                sample: dedentStrUsing1stLineIndent(`
                std::vector<int> v{ 3, 1, 4 };

                auto it = v.end();
                auto pv = std::prev(it, 2); // *pv == 1
                `)
            },
            {
                name : "ostream_iterator",
                descriptions : [
                'Single pass iterator that writes characters into  std::basic_ostream.',
                'ostream_iterator constructs/destructs object once per character, thus could have efficiency issues.',
                'ostream_iterator allows for delimeter when constructed.'
                ],
                sample: dedentStrUsing1stLineIndent(`
                vector<int> v { 1,2,3,4,5};

                copy(begin(v), end(v),
                    ostream_iterator<int>(cout, ", ")); //1, 2, 3, 4, 5
                `)
            },
            {
                name : "iter_swap",
                descriptions : [
                'Swap values of the elements the given iterators are pointing to.',
                ],
                sample: dedentStrUsing1stLineIndent(`
                vector<int> v { 1,2,3,4,5};

                iter_swap(begin(v), prev(v.end()));
                copy(begin(v), end(v),
                    ostream_iterator<int>(cout, ", ")); //5, 2, 3, 4, 1
                `)
            },
            {
                name : "distance",
                descriptions : [
                'Determines distance between 2 iterators.',
                'For random-access iterators, this function simply returns pos2-pos1.',
                'For other iterator categories(forward iterators, etc), it increments until it hits pos2.',
                'Has bad performance O(n) for non random access iterators.',
                ],
                sample: dedentStrUsing1stLineIndent(`
                vector<string> tmp { "One", "Two", "Three"};
                distance(begin(tmp), end(tmp)); // returns 3
                `)
            },
            {
                name : "move_iterator",
                descriptions : [
                'Dereferencing converts the value returned by the underlying iterator into an rvalue.',
                'If it is used as an input iterator, the effect is that the values are moved from, rather than copied from.'
                ],
                sample: dedentStrUsing1stLineIndent(`
                vector<string> tmp { "One", "Two", "Three"};
                using vstr_iterator = vector<string>::iterator;
                vector<string> fnl(move_iterator<vstr_iterator>(begin(tmp)),
                                      move_iterator<vstr_iterator>(end(tmp)));
                copy(begin(tmp), end(tmp), ostream_iterator<string>(cout, ", "));
                // Output: "", "", ""
                copy(begin(fnl), end(fnl), ostream_iterator<string>(cout, ", "));
                // Output: One, Two, Three
                `)
            },
            {
                name : "make_move_iterator",
                descriptions : [
                'A convenience function template that constructs a move_iterator.',
                ],
                sample: dedentStrUsing1stLineIndent(`
                vector<string> tmp { "One", "Two", "Three"};
                vector<string> fnl(make_move_iterator(begin(tmp)),
                                   make_move_iterator(end(tmp)));

                copy(begin(tmp), end(tmp), ostream_iterator<string>(cout, ", "));
                // Output: "", "", ""
                copy(begin(fnl), end(fnl), ostream_iterator<string>(cout, ", "));
                // Output: One, Two, Three
                `)
            },
            {
                name : "back_inserter",
                descriptions : [
                    'Allow algorithms to work with containers without knowing the size beforehand',
                    'Constructs a back_insert_iterator for the container with the type deduced from the type of the argument.',
                    'Works on containers that support a push_back operation.'
                ],
                sample: dedentStrUsing1stLineIndent(`
                vector<int> src { 1, 2, 3, 4, 5};
                vector<int> dest;
                transform(begin(src), end(src), back_inserter(dest),
                    [](int v) { return v*2; });
                // Output: dest = 2, 4, 6, 8, 10
                `)
            },
            {
                name : "front_inserter",
                descriptions : [
                    'Allow algorithms to work with containers without knowing the size beforehand',
                    'Constructs a front_insert_iterator for the container with the type deduced from the type of the argument.',
                    'Works on containers that support a push_front operation(mostly deques).'
                ],
                sample: dedentStrUsing1stLineIndent(`
                vector<int> src { 1, 2, 3, 4, 5};
                deque<int> dest;
                copy(begin(src), end(src), front_inserter(dest));
                // Output: dest = 5, 4, 3, 2, 1
                `)
            },
            {
                name : "inserter",
                descriptions : [
                    'Allow algorithms to work with containers without knowing the size beforehand',
                    'Constructs an insert_iterator for the container and its iterator with the type deduced from the type of the argument.',
                    'Works on containers that support insert operation.'
                ],
                sample: dedentStrUsing1stLineIndent(`
                vector<int> d { 7, 4, 3, 2, 5, 1, 6 };
                set<int> s;
                // Because sets are ordered, the output is arranged in ascending sorted order.
                copy(begin(d), end(d), inserter(s, begin(s)));
                // Output: dest = 1, 2, 3, 4, 5, 6, 7
                `)
            },
        ]
    }

})


var refactoringExamples = new Vue({
    el: '.refactoringExamples',
    data : {
        codes : [
            {
                description: 'Preconditions',
                before : dedentStrUsing1stLineIndent(`
                class Card {
                public:
                    Card(string suit, string rank)
                        : m_suit(suit)
                        , m_rank(rank) {}

                    bool operator==(const Card& other) {
                        return m_suit == other.m_suit && 
                                m_rank == other.m_rank;
                    }
                    string GetSuit() const { return m_suit; }
                    string GetRank() const { return m_rank; }
                private:
                    string m_suit;
                    string m_rank;
                };`),
                after : dedentStrUsing1stLineIndent(`
                vector<Card> deckOfCards { 
                    Card("Spades", "9"), Card("Diamond", "9"), Card("Spades", "9"),
                    Card("Hearts", "4"), Card("Clubs", "3"), Card("Diamond", "10"),
                };
                `)
            },
            {
                
                before_label: "Manual for-loop count 9-Spades",
                before : dedentStrUsing1stLineIndent(`                
                auto numSpades9 = 0;
                Card cardToCount("Spades", "9");
                for (auto i = 0; i < deckOfCards.size(); ++i) {
                    if (deckOfCards[i] == cardToCount) {
                        ++numSpades9;
                    }
                }`),
                after_label: "Using STL std::count",
                after : dedentStrUsing1stLineIndent(`
                Card cardToCount("Spades", "9");
                numSpades9 = count(begin(deckOfCards), end(deckOfCards), cardToCount);
                `)
            },
            {
                
                before_label: "Manual for-loop count card with rank == 9",
                before : dedentStrUsing1stLineIndent(`                
                auto numCardRank9 = 0;
                for (auto i = 0; i < deckOfCards.size(); ++i) {
                    if (deckOfCards[i].GetRank() == cardToCount.GetRank()) {
                        ++numCardRank9;
                    }
                }`),
                after_label: "Using STL std::count",
                after : dedentStrUsing1stLineIndent(`                
                const auto cardRank9 = "9";
                numCardRank9 = count_if(begin(deckOfCards), end(deckOfCards), 
                    [&cardRank9] (const Card& card) {
                        return cardRank9 == card.GetRank();
                    });
                `)
            },
        ],
    },
    computed : {
        splitted() {
            return splitListInChunks(this.codes, 1)
        },
    }
})