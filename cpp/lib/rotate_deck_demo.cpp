 #include "rotate_deck_demo.h"

#include <vector>
#include <algorithm>
#include <iterator>
#include <iostream>

#include "card.h"
#include "card_values.h"


namespace demo {

void RotateDeckDemo::AlternateCardsInHalf(std::vector<Card>& deck) const {

    // Note assumption made that we have even sized deck
    // and cards are sorted together.
    auto moved = begin(deck);

    while (moved != end(deck)) {
        moved = rotate(
            next(moved), // destination spot
            prev(end(deck)), // source spot
            end(deck) // source end exclusive
            );
    }
}


} // namespace demo
