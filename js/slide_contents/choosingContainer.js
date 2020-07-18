new Vue({
    el: '.choosingcontainer',
    data: {
        baseurl : 'https://en.cppreference.com/w/cpp/container/',
        containers: [
            { name: "array", descriptions: [
                "A thin wrapper over the C-style C-array.",
                "Size is fixed and must be known at compile time.",
                "Supports iterators giving it an advantage over regular C-array",
                "Type and size is required when creating an instance (e.g. std::array<int, 5>)."
            ]},
            { name: "vector", descriptions: [
                "A dynamic array, capable of random access.",
                "Requires contiguous memory.",
                "Resizes itself when inserting or erasing an object.",
                "Inserting to the back takes amortized constant time. Inefficient insertion/deletion other than back.",
                "Provides random access in the same way as an array."
            ]},
            { name: "deque", descriptions: [
                "Allows fast insertion and deletion at both its beginning and its end. Slow in the middle.",
                "Elements are not stored contiguously, but rather individual allocated fixed sized arrays (typical implementation).",
                "Larger minimal memory cost than a vector.",
                "Unlike a vector, it does not involve copying of the existing elements to a new memory when expanding.",
                "Provides random access in the same way as an array."
            ]},
            { name: "list", descriptions: [
                "Supports constant time insertion and removal of elements from anywhere in the container.",
                "Usually a doubly linked list.",
                "Does not support random access. (i.e. no subscript operation)",
            ]},
            { name: "forward_list", descriptions: [
                "Added in C++11.",
                "Supports constant time insertion and removal of elements from anywhere in the container.",
                "Implemented as singly-linked list.",
                "No support for size."
            ]},
            { name: "set", descriptions: [
                "An associative container that contains a sorted set of unique objects of type Key.",
                "Sorting is done using the key comparison function Compare, ascending by default (i.e. class Compare = std::less<Key>,).",
                "Search, removal, and insertion operations have logarithmic complexity.",
                "The key is the value itself. Key is unique, unlike multiset.",
                "Sets are usually implemented as red-black trees.",
            ]},
            { name: "map", descriptions: [
                "Is a sorted(unlike unordered_map) associative container that contains key-value pairs with unique keys.",
                "A key is mapped to a value. Keys are unique, unlike multimap.",
                "Sorting is done using the key comparison function Compare, ascending by default (i.e. class Compare = std::less<Key>,).",
                "Search, removal, and insertion operations have logarithmic complexity.",
            ]},
            { name: "unordered map / Unordered set", descriptions: [
                "Added in C++11.",
                "Is an unsorted associative container where values are hashed for lookup.",
                "Search, insertion and removal have average constant-time complexity.",
                "Values are stored in buckets, where a bucket is an array of linked-lists.",
                "Cannot be sorted (use map/set) due to forward iterator type. Sorting requires random access iterator."
            ]},
        ],
        pickingcontainer : {
            title: "Picking a Container",
            scenarios_and_picks: [
                {
                    Scene: "By Default.",
                    Pick: "Vector for smaller collections, Deque for growth efficiency. Map/Set for frequent lookups."
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
