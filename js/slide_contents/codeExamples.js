new Vue({
    el: '.refactoringExamples',
    data : {
        codes : [
            {
                description: 'Card class',
                before : dedentStrUsing1stLineIndent(`
                class Card {
                    public:
                       Card(std::string suit, std::string rank);
                       bool operator==(const Card& other) const;
                       bool operator!=(const Card& other) const;
                       bool operator<(const Card& other) const;

                       std::string GetSuit() const { return suit_; }
                       std::string GetRank() const { return rank_; }
                       friend std::ostream& operator<<(std::ostream& os,
                                                       const Card& card);
                    private:
                       std::string suit_;
                       std::string rank_;
                    };
                `),
            },
            {
                before_label: "Count cards in deck",
                before : dedentStrUsing1stLineIndent(`
                size_t count = 0;

                for (auto i = 0U; i < deck.size(); ++i) {
                    if (deck[i] == card_to_count) {
                        ++count;
                    }
                }

                return count;`),
                after_label: "Count using STL's count",
                after : dedentStrUsing1stLineIndent(`
                return count(begin(deck), end(deck), card_to_count);
                `)
            },
            {

                before_label: "Count cards with matching rank",
                before : dedentStrUsing1stLineIndent(`
                size_t count = 0;

                for (auto i = 0U; i < deck.size(); ++i) {
                    if (deck[i].GetRank() == rank) {
                        ++count;
                    }
                }

                return count;`),
                after_label: "Using STL's count_if",
                after : dedentStrUsing1stLineIndent(`
                return count_if(begin(deck), end(deck),
                    [&rank] (const Card& card) {
                        return card.GetRank() == rank;
                    });
                `)
            },
            {

                before_label: "Find first matching card",
                before : dedentStrUsing1stLineIndent(`
                Card foundCard;

                for(const auto& card : deck) {
                    if (card == card_to_find) {
                        foundCard = card;
                        break;
                    }
                }
                return foundCard;
                `),
                after_label: "Using STL's find",
                after : dedentStrUsing1stLineIndent(`
                const auto found = find(begin(deck), end(deck), card_to_find);

                return (found != end(deck)) ? *found : Card{};
                `)
            },
            {

                before_label: "Find first card matching suit",
                before : dedentStrUsing1stLineIndent(`
                Card foundCard;
                for(const auto& card : deck) {
                    if (card.GetSuit() == suit) {
                        foundCard = card;
                        break;
                    }
                }
                return foundCard;
                `),
                after_label: "Using STL's find_if",
                after : dedentStrUsing1stLineIndent(`
                const auto found = find_if(begin(deck), end(deck),
                                  [&suit] (const Card& card) {
                                    return card.GetSuit() == suit;
                                });
                return (found != end(deck)) ? *found : Card{};
                `)
            },

            {

                before_label: "Determine if all cards have same suit",
                before : dedentStrUsing1stLineIndent(`
                bool haveAllSameSuit = true;

                for (const auto& card : deck) {
                    if (card.GetSuit() != suit) {
                        haveAllSameSuit = false;
                        break;
                    }
                }
                return haveAllSameSuit;`),
                after_label: "Using STL's all_of",
                after : dedentStrUsing1stLineIndent(`
                return all_of(begin(deck), end(deck),
                    [&suit](const Card& card) {
	                    return card.GetSuit() == suit;
                });`)
            },

            {

                before_label: "Find if any card matches rank",
                before : dedentStrUsing1stLineIndent(`
                bool haveRank = false;

                for (const auto& card : deck) {
                    if (card.GetRank() == rank) {
                        haveRank = true;
                        break;
                    }
                }
	            return haveRank;
                `),
                after_label: "Using STL's any_of",
                after : dedentStrUsing1stLineIndent(`
                return any_of(begin(deck), end(deck),
                    [&rank](const Card& card) {
                        return card.GetRank() == rank;
                    });`)
            },

            {

                before_label: "Generate suit names except for first item in deck.",
                before : dedentStrUsing1stLineIndent(`
                std::vector<std::string> suits;

                bool first = true;
                for(const auto& card : deck) {
                    if (!first) {
                        suits.push_back(card.GetSuit());
                    } else {
                        first = false;
                    }
                }
                return suits;`),
                after_label: "Using STL's transform",
                after : dedentStrUsing1stLineIndent(`
                std::vector<std::string> suits;
                transform(next(begin(deck)), end(deck), back_inserter(suits),
                    [](const Card& card) {
                        return card.GetSuit();
                    });
                `)
            },

            {

                before_label: "Generate suit names for all items in deck.",
                before : dedentStrUsing1stLineIndent(`
                std::vector<std::string> suits;
                for(const auto& card : deck) {
                    suits.push_back(card.GetSuit());
                }
                return suits;`),

                after_label: "For whole collections, ranged for loops could be as clean or cleaner than transform.",
                after : dedentStrUsing1stLineIndent(`
                std::vector<std::string> suits;
                std::transform(begin(deck), end(deck), back_inserter(suits),
                        [](const Card& card) {
                            return card.GetSuit();
                        });
                return suits;
                `)
            },

            {
                before_label: "Deal cards to 2 players via copy",
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

                auto totalCard = accumulate(begin(hand), end(hand),
                    Card("", "0"),
                    [](const Card& cardCombined, const Card& current) {
                        // note: possible stoi error elided
                        auto combinedRank = stoi(cardCombined.GetRank()) +
                                            stoi(current.GetRank());
                        const auto strCombinedRank = to_string(combinedRank);
                        return Card(current.GetSuit(), strCombinedRank);
                    });
                    // Result = 27 of Spades
                }`),
            },

            {
                before_label: "Rotate diamonds to the middle of 2 spades.",
                before_drawing: "img/before_rotate.png",
                before : dedentStrUsing1stLineIndent(`
                vector<Card> cards {Card("Spades","9"),Card("Spades","9"),
                                    Card("Spades","9"),Card("Spades","9"),
                                    Card("Diamond","10"),Card("Diamond","10"),
                                    Card("Diamond","10"),Card("Diamond","10")
                                };
                `),
            },
            {
                before_label: "We use std::rotate to move the diamonds to the middle.",
                before_drawing: "img/after_rotate.png",
                before : dedentStrUsing1stLineIndent(`
                auto num9spades = count(begin(cards), end(cards),
                                       Card("Spades","9"));
                // moved points to the location of first 9 after rotation.
                // This is the first 9 at the end of the rotated collection.
                auto moved = rotate(next(begin(cards), num9spades/2),
                                         next(begin(cards), num9spades),
                                         end(cards));
                `)
            },
            {
                before_label: "Split cards into diamonds and spades preserving order.",
                before_drawing: "img/partition_before.png",
                before : dedentStrUsing1stLineIndent(`
                vector<Card> cards { Card("Spades","10"), Card("Diamond","5"),
                                     Card("Diamond","2"), Card("Spades","3"),
                                     Card("Diamond","4"), Card("Spades","5") };
                `),
            },
            {
                before_label: "Use stable_partition to re-order cards but preserving relative order.",
                before_drawing: "img/partition_after.png",
                before : dedentStrUsing1stLineIndent(`
                // Use partition if relative order is not important.
                auto partition_pt = stable_partition(
                                    begin(cards), end(cards),
                                    [](const Card& card)
                                    {
                                        return card.GetSuit() == "Diamond";
                                    });
                `)
            },
            {
                before_label: "Create a set of cards from a vector using a custom functor type comparator",
                before : dedentStrUsing1stLineIndent(`
                struct CardValueComparator {
                bool operator() (const Card& card1, const Card& card2) const {
                    const auto card1Val = CSValueMap.at(card1.GetSuit()) +
                                          CRValueMap.at(card1.GetRank());
                    const auto card2Val = CSValueMap.at(card2.GetSuit()) +
                                          CRValueMap.at(card2.GetRank());
                    return (card1Val < card2Val);
                }
                };
                `),
                after_label: "Use copy into set declared with comparator.",
                after : dedentStrUsing1stLineIndent(`
                set<Card, CardValueComparator> myCards;
                copy(begin(srcDeck), end(srcDeck),
                     inserter(myCards, begin(myCards)));
                `)
            },
            {
                before_label: "Create a set of cards from a vector using a custom lambda comparator",
                before : dedentStrUsing1stLineIndent(`
                auto comparator = [](const Card& card1, const Card& card2) {
                    const auto card1Val = CSValueMap.at(card1.GetSuit()) +
                                          CRValueMap.at(card1.GetRank());
                    const auto card2Val = CSValueMap.at(card2.GetSuit()) +
                                          CRValueMap.at(card2.GetRank());
                    return (card1Val < card2Val);
                };
                `),
                after_label: "Use copy into set declared with comparator.",
                after : dedentStrUsing1stLineIndent(`
                // We don't need to pass lambda comparator in C++20. We need
                // to pass this prior because lambda closures have deleted
                // default constructor. Since C++20, lambda's with empty
                // captures will have a default constructor.
                set<Card, decltype(comparator)> myCards(comparator);
                copy(begin(srcDeck), end(srcDeck),
                     inserter(myCards, begin(myCards)));
                `)
            },
            {
                before_label: "Determine if a sorted collection exists within another collection",
                before : dedentStrUsing1stLineIndent(`
                const auto hasFourQueens = includes(
                    begin(sortedCardsByValueSet),
                    end(sortedCardsByValueSet),
                    begin(fourQueenSet),
                    end(fourQueenSet),
                    cardValueComparator);
                `),
            },
            {
                before_label: "Reduce 3 cards with the highest values by 100.",
                before : dedentStrUsing1stLineIndent(`
                vector<CardScore> cardsAndValues {
                    { Card("Spades","8"), 12 }, { Card("Spades","10"),  212 },
                    { Card("Clubs","10"), 20 }, { Card("Heart","10"),   170 },
                    { Card("Diamond","10"), 344 }
                   };
                `),
                after_label: "Use partial sort and foreach.",
                after : dedentStrUsing1stLineIndent(`
                partial_sort( begin(cardsAndValues),
                              next(begin(cardsAndValues), 3),
                              end(cardsAndValues),
                    [](const CardScore& cardValue1,
                       const CardScore& cardValue2) {
                        return cardValue1.score > cardValue2.score;
                    });
                for_each(begin(cardsAndValues),
                         next(begin(cardsAndValues), 3),
                    [](CardScore& cardScore) { cardScore.score -= 100; });
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
