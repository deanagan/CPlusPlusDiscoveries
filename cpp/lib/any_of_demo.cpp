#include "any_of_demo.h"

#include <vector>
#include <algorithm>

#include "card.h"


namespace demo {

bool AnyOfDemo::HasCard(const std::vector<Card>& deck, const Card& card) const {
    return any_of(begin(deck), end(deck),
                [&card](const Card& card_in_deck) {
                    return card_in_deck == card;
                });
}

} // namespace demo
