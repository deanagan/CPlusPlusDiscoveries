new Vue({
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
                    auto someFn = [number](int anotherNumber) {
                        ++number; // Error! expression must be modifiable lvalue
                        return anotherNumber + number;
                    };`),
                    dedentStrUsing1stLineIndent(`
                    auto someFn = [number](int anotherNumber) mutable {
                        ++number; // Now good due to mutable.
                        return anotherNumber + number;
                    };`)
                ]
            },

            {
                statement : "If it were a reference though, it will still work as 'number' is now external to the object, and does not alter the object state.",
                codes : [
                    dedentStrUsing1stLineIndent(`
                    auto someFn = [&number](int anotherNumber) {
                        ++number;
                        return anotherNumber + number;
                    };`),
                    dedentStrUsing1stLineIndent(`
                    // Applies to pointers too!
                    auto someFn = [pnumber](int anotherNumber) {
                        ++(*pnumber);
                        return anotherNumber + *pnumber;
                    };`)
                ]
            },
        ]
    }
})