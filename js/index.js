

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
            'Example Algorithm: find_if',
            'Discovering Lambdas',
            'Iterators',
            'Code Examples'
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
            'There are more free functions instead of member functions ( e.g. find(container..) instead of container.find() ).',
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
                heading : "Example Algorithm: find_if",
                subheading: "Finding the first odd number",

                code: [
                    replaceDoubleSpaceStrings(`vector<int> n { 2, 4, 6, 9, 10 };
                     auto result_iter = find_if(begin(n), end(n), ???);`)
                ]
            },

            {
                heading : "Before C++11, we had 2 common approaches",
                subheading: "Using a stand alone/free function",

                code: [
                    'bool IsOdd(int n) { return n % 2 != 0; }',
                    dedentStrUsing1stLineIndent(`
                    void printFirstOdd() {
                        vector<int>::iterator it; // no auto yet!
                        it = find_if(n.begin(), n.end(), IsOdd);
                        if (it != n.end()) {
                            cout << *it;
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
                    void printFirstOdd() {
                        vector<int>::iterator it; // no auto yet!
                        IsOdd isOdd;
                        it = find_if(n.begin(), n.end(), isOdd);

                        if (it != n.end()) {
                          cout << *it;
                        }
                    }`)
                  ],
            },

            {
                heading : "With Modern C++(C++11 and beyond), we now have lambdas.",
                subheading: "C++14 and beyond has generic lambdas too!",

                code: [
                    dedentStrUsing1stLineIndent(`
                    void printFirstOdd() {
                        auto it = find_if(begin(n), end(n), [] (int n) {
                            return n%2 != 0;
                        });

                        if (it != n.end()) {
                          cout << *it;
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
            auto fn = [](const string& name)
            { cout << "Hello, " << name; };`),
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
                            Product(int multiplier) : multiplier_(multiplier) {}
                            int operator()(int multiplicand) const
                            {
                                return multiplicand * multiplier_;
                            }
                        private:
                            int multiplier_;
                    };`)
                ]
            },
            {
                statement : "Lambdas follows the same syntax rules for const-qualified methods.",
                codes : [
                    dedentStrUsing1stLineIndent(`
                    auto someFn = [someNumber](int anotherNumber) {
                        ++someNumber; // Error! expression must be a modifiable lvalue
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
                    function<int(int)> GetModuloFn() {
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
                            return [this] (int value) { return value % this->xaxis; };
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
                vector<int> v{ 3, 1, 4 };
                auto vi = v.begin(); // *vi == 3
                advance(vi, 2); // *vi == 4
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
                vector<int> v{ 3, 1, 4 };

                auto it = v.begin(); // *it == 3
                auto nx = next(it, 2); // *nx == 4
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
                vector<int> v{ 3, 1, 4 };

                auto it = v.end();
                auto pv = prev(it, 2); // *pv == 1
                `)
            },
            {
                name : "ostream_iterator",
                descriptions : [
                'Single pass iterator that writes characters into  basic_ostream.',
                'ostream_iterator constructs/destructs object once per character, thus could have efficiency issues.',
                'ostream_iterator allows for delimiter when constructed.'
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
                // Because sets are ordered, the output is
                // arranged in ascending sorted order.
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
                description: 'Demonstrations using a Card class',
                before : dedentStrUsing1stLineIndent(`
                class Card {
                public:
                   Card(string suit="", string rank="")
                       : m_suit(move(suit)), m_rank(move(rank)) {}
                   bool operator==(const Card& other) const {
                       return m_suit == other.m_suit &&
                               m_rank == other.m_rank;
                   }
                   string GetSuit() const { return m_suit; }
                   string GetRank() const { return m_rank; }
                   friend ostream & operator<<(ostream &os, const Card& card);
                private:
                   string m_suit;
                   string m_rank;
                };

                `),
            },
            {
                before : dedentStrUsing1stLineIndent(`
                ostream& operator<<(ostream& os, const Card& card)
                {
                   return os << card.GetRank() << " of " << card.GetSuit();
                }

                vector<Card> deck {
                   Card("Spades", "9"), Card("Diamond", "9"), Card("Spades", "9"),
                   Card("Hearts", "5"), Card("Clubs", "3"), Card("Diamond", "7"),
                };
                `)
            },
            {
                before_label: "for-loop count 9-Spades",
                before : dedentStrUsing1stLineIndent(`
                auto numSpades9 = 0;
                Card cardToCount{"Spades", "9"};
                for (auto i = 0U; i < deck.size(); ++i) {
                    if (deck[i] == cardToCount) {
                        ++numSpades9;
                    }
                }`),
                after_label: "Using STL count",
                after : dedentStrUsing1stLineIndent(`
                Card cardToCount{"Spades", "9"};
                numSpades9 = count(begin(deck), end(deck), cardToCount);
                `)
            },
            {

                before_label: "for-loop count card with rank == 9",
                before : dedentStrUsing1stLineIndent(`
                auto numCardRank9 = 0;
                for (auto i = 0U; i < deck.size(); ++i) {
                    if (deck[i].GetRank() == "9") {
                        ++numCardRank9;
                    }
                }`),
                after_label: "Using STL count_if",
                after : dedentStrUsing1stLineIndent(`
                numCardRank9 = count_if(begin(deck), end(deck),
                    [] (const Card& card) {
                        return card.GetRank() == "9";
                    });
                `)
            },
            {

                before_label: "for-loop find card with Clubs 3",
                before : dedentStrUsing1stLineIndent(`
                Card foundCard;
                Card cardToFind{"Clubs", "3"};
                for(const auto& card : deck) {
                    if (card == cardToFind) {
                        foundCard = card;
                        break;
                    }
                }
                return foundCard;
                `),
                after_label: "Using STL find",
                after : dedentStrUsing1stLineIndent(`
                auto found = find(begin(deck), end(deck)
                                , Card{"Clubs", "3"});
                return (found != end(deck)) ? *found : Card{};
                `)
            },
            {

                before_label: "for-loop find first card that has suit == Hearts",
                before : dedentStrUsing1stLineIndent(`
                Card foundCard;
                for(const auto& card : deck) {
                    if (card.GetSuit() == "Hearts") {
                        foundCard = card;
                        break;
                    }
                }
                return foundCard;
                `),
                after_label: "Using STL find_if",
                after : dedentStrUsing1stLineIndent(`
                auto found = find_if(begin(deck), end(deck)
                                , [] (const Card& card) {
                                    return card.GetSuit() == "Hearts";
                                });
                return (found != end(deck)) ? *found : Card{};
                `)
            },

            {

                before_label: "for-loop find if all cards have odd rank number",
                before : dedentStrUsing1stLineIndent(`
                bool isAllOdd = true;
                for (const auto& card : deck) {
                    if (stoi(card.GetRank()) % 2 == 0) {
                        isAllOdd = false;
                        break;
                    }
                }
                cout << boolalpha << isAllOdd;`),
                after_label: "Using STL all_of",
                after : dedentStrUsing1stLineIndent(`
                const auto isAllOdd = all_of(begin(deck), end(deck),
                                    [](const Card& card) {
                                        return stoi(card.GetRank()) % 2 != 0;
                                    });
                cout << boolalpha << isAllOdd;`)
            },

            {

                before_label: "for-loop find if any card is Hearts 5",
                before : dedentStrUsing1stLineIndent(`
                bool hasHearts5 = false;
                Card cardToHave{"Hearts", "5"};
                for (const auto& card : deck) {
                    if (card == cardToHave) {
                        hasHearts5 = true;
                        break;
                    }
                }
                cout << boolalpha << hasHearts5;`),
                after_label: "Using STL any_of",
                after : dedentStrUsing1stLineIndent(`
                Card cardToHave{"Hearts", "5"};
                const auto hasHearts5 = any_of(begin(deck), end(deck),
                                    [&cardToHave](const Card& card) {
                                        return cardToHave == card;
                                    });
                cout << boolalpha << hasHearts5;`)
            },

            {

                before_label: "Generate suit names except for first item in deck.",
                before : dedentStrUsing1stLineIndent(`
                vector<string> suits;
                auto is_first = true;
                for(const auto& card : deck) {
                    if (!is_first) {
                        suits.push_back(card.GetSuit());
                    } else {
                        is_first = false;
                    }
                }`),
                after_label: "Using transform",
                after : dedentStrUsing1stLineIndent(`
                vector<string> suits;
                transform(next(begin(deck)), end(deck), back_inserter(suits),
                    [](const Card& card) {
                        return card.GetSuit();
                    });
                `)
            },

            {

                before_label: "Generate suit names for all items in deck.",
                before : dedentStrUsing1stLineIndent(`
                vector<string> suits;
                for(const auto& card : deck) {
                    suits.push_back(card.GetSuit());
                }`),

                after_label: "However, for whole collections, ranged for loops could be as clean or cleaner than transform.",
                after : dedentStrUsing1stLineIndent(`
                transform(begin(deck), end(deck), back_inserter(suits),
                    [](const Card& card) {
                        return card.GetSuit();
                    });
                `)
            },

            {
                before_label: "Deal cards to 2 players using partition_copy",
                before : dedentStrUsing1stLineIndent(`
                vector<Card> player1;
                vector<Card> player2;
                // Note: [toggle=false] doesn't work for C++11, define toggle
                // before passing to lambda.
                partition_copy(begin(deck),
                               end(deck),
                               back_inserter(player1),
                               back_inserter(player2),
                               [toggle = false](const Card&) mutable
                               { return toggle = !toggle; });
                `),
            },

            {
                before_label: "Accumulate hand into a card with total rank",
                before : dedentStrUsing1stLineIndent(`
                vector<Card> hand { Card("Spades", "9"),
                                    Card("Spades", "9"),
                                    Card("Spades", "9") };

                auto totalCard = accumulate(begin(hand), end(hand), Card("", "0"),
                    [](const Card& cardCombined, const Card& current) {
                        // possible stoi error elided
                        auto combinedRank = stoi(cardCombined.GetRank()) +
                                            stoi(current.GetRank());
                        return Card(current.GetSuit(), to_string(combinedRank));
                    });
                    // Result = 27 of Spades
                    cout << "Combined Card: " << totalCard;
                }`),
            },

            {
                before_label: "Rotate diamonds to the middle of 2 spades.",
                before_drawing: "img/before_rotate.png",
                before : dedentStrUsing1stLineIndent(`
                vector<Card> cards { Card("Spades","9"), Card("Spades","9"),
                                     Card("Spades","9"), Card("Spades","9"),
                                     Card("Diamond","10"), Card("Diamond","10"),
                                     Card("Diamond","10"), Card("Diamond","10") };
                `),
            },
            {
                before_label: "We use rotate to move the diamonds to the middle.",
                before_drawing: "img/after_rotate.png",
                before : dedentStrUsing1stLineIndent(`
                auto numspades = count(begin(cards),end(cards),Card("Spades","9"));
                // moved points to the location of first after rotation.
                // This is the first 9 at the end of the rotated collection.
                auto moved = rotate(next(begin(cards), numspades/2),
                                         next(begin(cards), numspades),
                                         end(cards));
                `)
            },
            {
                before_label: "Partition cards into diamonds and spades.",
                before_drawing: "img/partition_before.png",
                before : dedentStrUsing1stLineIndent(`
                vector<Card> cards { Card("Spades","10"), Card("Diamond","5"),
                                     Card("Diamond","2"), Card("Spades","3"),
                                     Card("Diamond","4"), Card("Spades","5") };
                `),
            },
            {
                before_label: "We use stable partition to re-order cards but preserving relative order. Partition does the same but does not preserve order.",
                before_drawing: "img/partition_after.png",
                before : dedentStrUsing1stLineIndent(`
                auto partition_point = stable_partition(
                                        begin(cards),
                                        end(cards), [](const Card& card)
                                        {
                                            return card.GetSuit() == "Diamond";
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
