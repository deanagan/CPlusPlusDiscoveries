#pragma once

#include "card.h"
#include <vector>

namespace demo {

class CountingCardDemo {

public:
    using CardScorePair = std::pair<Card, int>;
    using CardScores = std::vector<CardScorePair>;

    int GetTotalDeckValue(const CardScores& scores) const;
    int GetTotalDeckValueSTL(const CardScores& scores) const;
    int CountCardWithRankSTL(const std::vector<Card>& deck, const std::string& rank) const;
    int CountCardWithRank(const std::vector<Card>& deck, const std::string& rank) const;
    int CountCardSTL(const std::vector<Card>& deck, const Card& card_to_find) const;
    int CountCard(const std::vector<Card>& deck, const Card& card_to_find) const;
};

} // namespace demo
