#pragma once

#include "card.h"
#include <vector>

namespace demo {

class HasCardDemo {

public:
    bool DoAllCardsHaveSameSuit(const std::vector<Card>& deck, const std::string& suit) const;
    bool DoAllCardsHaveSameSuitSTL(const std::vector<Card>& deck, const std::string& suit) const;
    bool DoAnyCardsHaveRank(const std::vector<Card>& deck, const std::string& rank) const;
    bool DoAnyCardsHaveRankSTL(const std::vector<Card>& deck, const std::string& rank) const;

};

} // namespace demo
