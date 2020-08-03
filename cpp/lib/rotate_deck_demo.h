#pragma once

#include "card.h"
#include <vector>

namespace demo {

class RotateDeckDemo {

public:
    void AlternateCardsInHalf(std::vector<Card>& deck) const;
    void MoveSecondHalfIntoMiddleOfFirstHalf(std::vector<Card>& deck) const;
    void SplitAndPreserveOrder(std::vector<Card>& deck, const std::string& suit) const;

};

} // namespace demo
