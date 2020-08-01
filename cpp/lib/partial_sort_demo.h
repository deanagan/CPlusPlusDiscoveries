#pragma once

#include "card.h"
#include <vector>

namespace demo {

class PartialSortDemo {

public:
    using CardScorePair = std::pair<Card, int>;
    using CardScores = std::vector<CardScorePair>;
    static void ReduceTopNCardScores(CardScores& cardScores, int top_n, int amount);

};

} // namespace demo
