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
        {card_suit::kSpades, 0},
        {card_suit::kClubs, 13},
        {card_suit::kHearts, 27},
        {card_suit::kDiamonds, 39},
    };

    const std::map<std::string, int> kCardRankValueMap {
        {card_rank::kTwo, 1},
        {card_rank::kThree, 2},
        {card_rank::kFour, 3},
        {card_rank::kFive, 4},
        {card_rank::kSix, 5},
        {card_rank::kSeven, 6},
        {card_rank::kEight, 7},
        {card_rank::kNine, 8},
        {card_rank::kTen, 9},
        {card_rank::kJack, 10},
        {card_rank::kQueen, 11},
        {card_rank::kKing, 12},
        {card_rank::kAce, 13},
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