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
                int count = 0;

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
                int count = 0;

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
                before_label: "Accumulate scores from card collection",
                before : dedentStrUsing1stLineIndent(`
                // using CardScorePair = std::pair<Card, int>;
                // using CardScores = std::vector<CardScorePair>;
                unsigned int total = 0;
                for (const auto& csp : scores)
                {
                    total += csp.second;
                }
                return total;
                `),
                after_label: "Using accumulate",
                after : dedentStrUsing1stLineIndent(`
                // Generic lambdas can make this look cleaner.
                return accumulate(begin(scores), end(scores), 0,
                    [](const int total, const CardScorePair& current) {
                        return total + current.second;
                    });
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
                before_label: "Use stable_partition to re-order cards but preserving relative order.",
                before_drawing: "img/partition_after.png",
                before : dedentStrUsing1stLineIndent(`
                // Use partition if relative order is not important.
                auto partition_pt = stable_partition(
                                   begin(deck), end(deck),
                                   [&suit](const Card& card) {
                                      return card.GetSuit() == suit;
                                   }
                                );
                `)
            },
            {
                before_label: "Reduce top cards by certain amount",
                before : dedentStrUsing1stLineIndent(`
                // Partial sort to get top n.
                partial_sort( begin(scores), next(begin(scores), top_n),
                              end(scores),
                              [](const CardScorePair& csp1,
                                 const CardScorePair& csp2) {
                                  return csp.second > csp.second;
                              });
                // Reduce top n score by amount.
                for_each(begin(scores), next(begin(scores), top_n),
                        [amount](CardScorePair& score) {
                            score.second -= amount;
                        });
                `),

            },
            {
                before_label: "Split cards into diamonds and spades preserving order.",
                before_drawing: "img/partition_before.png",
                before : dedentStrUsing1stLineIndent(`
                std::vector<Card> deck {
                    Card(card_suit::Spades,   card_rank::Ten),
                    Card(card_suit::Diamonds, card_rank::Five),
                    Card(card_suit::Diamonds, card_rank::Two),
                    Card(card_suit::Spades,   card_rank::Three),
                    Card(card_suit::Diamonds, card_rank::Four),
                    Card(card_suit::Spades,   card_rank::Five)
                };
                `),
            },
            {
                before_label: "Rotate diamonds to the middle of 2 spades.",
                before_drawing: "img/before_rotate.png",
                before : dedentStrUsing1stLineIndent(`
                std::vector<Card> deck {
                    Card(card_suit::Spades,   card_rank::Nine),
                    Card(card_suit::Spades,   card_rank::Nine),
                    Card(card_suit::Spades,   card_rank::Nine),
                    Card(card_suit::Spades,   card_rank::Nine),
                    Card(card_suit::Diamonds, card_rank::Ten),
                    Card(card_suit::Diamonds, card_rank::Ten),
                    Card(card_suit::Diamonds, card_rank::Ten),
                    Card(card_suit::Diamonds, card_rank::Ten),
                };
                `),
            },
            {
                before_label: "We use std::rotate to move the diamonds to the middle.",
                before_drawing: "img/after_rotate.png",
                before : dedentStrUsing1stLineIndent(`
                const auto first_half_len = count(begin(deck),
                                                  end(deck),
                                                  deck.front());

                auto moved = rotate(next(begin(deck), first_half_len/2),
                                    next(begin(deck), first_half_len),
                                    end(deck));
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
