#include "counting_card_demo.h"

#include <vector>
#include <algorithm>

#include "card.h"


namespace demo {

size_t CountingCardDemo::CountCard(const std::vector<Card>& deck, const Card& card_to_count) const {

    size_t count = 0;

    for (auto i = 0U; i < deck.size(); ++i) {
        if (deck[i] == card_to_count) {
            ++count;
        }
    }

    return count;
}

size_t CountingCardDemo::CountCardSTL(const std::vector<Card>& deck, const Card& card_to_count) const {

    return count(begin(deck), end(deck), card_to_count);
}

size_t CountingCardDemo::CountCardWithRank(const std::vector<Card>& deck, const std::string& rank) const {

    size_t count = 0;

    for (auto i = 0U; i < deck.size(); ++i) {
        if (deck[i].GetRank() == rank) {
            ++count;
        }
    }

    return count;
}

size_t CountingCardDemo::CountCardWithRankSTL(const std::vector<Card>& deck, const std::string& rank) const {

    return count_if(begin(deck), end(deck),
                    [&rank] (const Card& card) {
                        return card.GetRank() == rank;
                    });
}


} // namespace demo
