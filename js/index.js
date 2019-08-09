

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
            'Why use the STL?',
            'The STL Approach',
            'Choosing our Containers',
            'Example Algorithm: std::find_if',
            'Discovering Lambdas',
            'The Power of Iterators',
            'Refactoring to Use Algorithms'
        ],

        lambdacoverage : [
            'Syntax',
            'Captures',
            'Mutable',
            'Guidelines'
        ]
    }
});

var stlApproach = new Vue({
    el: '.stlapproach',
    data : {
        approaches : [
            'There is preference for free functions over member functions (e.g. std::find(container..) over container.find() ).',
            'Algorithms are designed to work for most containers.',
            'Algorithms work with iterators.'
        ]
    }

});
