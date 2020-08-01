#include "card.h"



#include <iostream>
#include <algorithm>
#include <iterator>
#include <vector>
#include <string>
#include <map>

#include "card_values.h"

namespace demo {
namespace {

    const std::map<std::string, int> kCardSuitValueMap {
        {card_suit::Spades, 0},
        {card_suit::Clubs, 13},
        {card_suit::Hearts, 27},
        {card_suit::Diamonds, 39},
    };

    const std::map<std::string, int> kCardRankValueMap {
        {card_rank::Two, 1},
        {card_rank::Three, 2},
        {card_rank::Four, 3},
        {card_rank::Five, 4},
        {card_rank::Six, 5},
        {card_rank::Seven, 6},
        {card_rank::Eight, 7},
        {card_rank::Nine, 8},
        {card_rank::Ten, 9},
        {card_rank::Jack, 10},
        {card_rank::Queen, 11},
        {card_rank::King, 12},
        {card_rank::Ace, 13},
    };
}

Card:: Card(std::string suit, std::string rank)
    : suit_(std::move(suit))
    , rank_(std::move(rank))
{}

bool Card::operator==(const Card& other) const {
    const auto other_value = kCardSuitValueMap.at(other.GetSuit()) + kCardRankValueMap.at(other.GetRank());
    const auto this_value =  kCardSuitValueMap.at(GetSuit()) + kCardRankValueMap.at(GetRank());

    return this_value == other_value;
}

bool Card::operator!=(const Card& other) const {
    return !(*this == other);
}

bool Card::operator<(const Card& other) const {
    const auto other_value = kCardSuitValueMap.at(other.GetSuit()) + kCardRankValueMap.at(other.GetRank());
    const auto this_value =  kCardSuitValueMap.at(GetSuit()) + kCardRankValueMap.at(GetRank());

    return this_value < other_value;
}

std::ostream& operator<<(std::ostream& os, const Card& card) {
    return os << card.GetRank() << " of " << card.GetSuit();
}

} // namespace Demo