#pragma once

#include "card.h"
#include <vector>

namespace demo {

class FindingCardDemo {

public:
    Card GetCard(const std::vector<Card>& deck, const Card& card_to_find) const;
    Card GetCardUsingFind(const std::vector<Card>& deck, const Card& card_to_find) const;
    Card FindFirstWithSuit(const std::vector<Card>& deck, const std::string& suit) const;
    Card FindFirstWithSuitSTL(const std::vector<Card>& deck, const std::string& suit) const;

};

} // namespace demo
