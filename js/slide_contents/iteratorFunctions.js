new Vue({
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
                vector<string> src { "One", "Two", "Three"};
                using vs_iterator = vector<string>::iterator;
                vector<string> dest(move_iterator<vs_iterator>(begin(src)),
                                   move_iterator<vs_iterator>(end(src)));
                copy(begin(src), end(src),
                     ostream_iterator<string>(cout, ", "));
                // Output: "", "", ""
                copy(begin(dest), end(dest),
                     ostream_iterator<string>(cout, ", "));
                // Output: One, Two, Three
                `)
            },
            {
                name : "make_move_iterator",
                descriptions : [
                'A convenience function template that constructs a move_iterator.',
                ],
                sample: dedentStrUsing1stLineIndent(`
                vector<string> src { "One", "Two", "Three"};
                vector<string> dest(make_move_iterator(begin(src)),
                                    make_move_iterator(end(src)));

                copy(begin(src), end(src),
                     ostream_iterator<string>(cout, ", "));
                // Output: "", "", ""
                copy(begin(dest), end(dest),
                     ostream_iterator<string>(cout, ", "));
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