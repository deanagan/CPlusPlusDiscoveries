new Vue({
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
