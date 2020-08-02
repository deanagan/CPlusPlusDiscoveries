#pragma once

#include "card.h"
#include <vector>

namespace demo {

class PartialSortDemo {

public:
    using CardScorePair = std::pair<Card, int>;
    using CardScores = std::vector<CardScorePair>;
    void ReduceTopNCardScores(CardScores& cardScores, int top_n, int amount) const;
    void DistributeCards(const std::vector<Card>& deck, std::vector<Card>& player1, std::vector<Card>& player2) const;
};

} // namespace demo
