#pragma once

#include "card.h"
#include <vector>

namespace demo {

class AnyOfDemo {

public:
    bool HasCard(const std::vector<Card>& deck, const Card& card) const;
};

} // namespace demo
