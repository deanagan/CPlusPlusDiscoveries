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
            prev(end(deck)), // source spot, we keep picking of the end.
            end(deck) // source end exclusive
            );
    }
}

void RotateDeckDemo::MoveSecondHalfIntoMiddleOfFirstHalf(std::vector<Card>& deck) const {

    // Note assumption made that we have even sized deck
    // and cards are sorted together.
    const auto first_half_len = count(begin(deck), end(deck), deck.front());

    auto moved = rotate(next(begin(deck), first_half_len/2),
                        next(begin(deck), first_half_len),
                        end(deck));
}

void RotateDeckDemo::SplitAndPreserveOrder(std::vector<Card>& deck, const std::string& suit) const {
    // Use partition if relative order is not important.
    auto partition_pt = stable_partition(
                            begin(deck), end(deck),
                            [&suit](const Card& card) {
                                return card.GetSuit() == suit;
                            }
                        )
}


} // namespace demo
