#include "card.h"



#include <iostream>
#include <algorithm>
#include <iterator>
#include <vector>
#include <string>
#include <map>

namespace demo {
namespace {

    const std::map<std::string, int> kCardSuitValueMap {
        {"Spades", 0},
        {"Clubs",  13},
        {"Hearts", 27},
        {"Diamond",39},
    };

    const std::map<std::string, int> kCardRankValueMap {
        {"2", 1},
        {"3", 2},
        {"4", 3},
        {"5", 4},
        {"6", 5},
        {"7", 6},
        {"8", 7},
        {"9", 8},
        {"10",9},
        {"J", 10},
        {"Q", 11},
        {"K", 12},
        {"A", 13},
    };
}

Card:: Card(std::string suit, std::string rank) : suit_(suit), rank_(rank)
{}

bool Card::operator==(const Card& other) const {
    const auto other_value = kCardSuitValueMap.at(other.GetSuit()) + kCardRankValueMap.at(other.GetRank());
    const auto this_value =  kCardSuitValueMap.at(GetSuit()) + kCardRankValueMap.at(GetRank());

    return this_value == other_value;
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