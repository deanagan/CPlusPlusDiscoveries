#pragma once

#include "card.h"
#include <vector>

namespace demo {

class CountingCardDemo {

public:
    size_t CountCardWithRankSTL(const std::vector<Card>& deck, const std::string& rank) const;
    size_t CountCardWithRank(const std::vector<Card>& deck, const std::string& rank) const;
    size_t CountCardSTL(const std::vector<Card>& deck, const Card& card_to_find) const;
    size_t CountCard(const std::vector<Card>& deck, const Card& card_to_find) const;
};

} // namespace demo
