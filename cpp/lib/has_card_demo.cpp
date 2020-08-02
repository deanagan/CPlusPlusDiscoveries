#include "has_card_demo.h"

#include <vector>
#include <algorithm>

#include "card.h"


namespace demo {

bool HasCardDemo::DoAllCardsHaveSameSuit(const std::vector<Card>& deck, const std::string& suit) const {
    bool haveAllSameSuit = true;

    for (const auto& card : deck) {
        if (card.GetSuit() != suit) {
            haveAllSameSuit = false;
            break;
        }
    }
	return haveAllSameSuit;
}

bool HasCardDemo::DoAllCardsHaveSameSuitSTL(const std::vector<Card>& deck, const std::string& suit) const {
    return all_of(begin(deck), end(deck),
                [&suit](const Card& card) {
	                return card.GetSuit() == suit;
                });
}

bool HasCardDemo::DoAnyCardsHaveRank(const std::vector<Card>& deck, const std::string& rank) const {
    bool haveRank = false;

    for (const auto& card : deck) {
        if (card.GetRank() == rank) {
            haveRank = true;
            break;
        }
    }
	return haveRank;
}

bool HasCardDemo::DoAnyCardsHaveRankSTL(const std::vector<Card>& deck, const std::string& rank) const {
    return any_of(begin(deck), end(deck),
                [&rank](const Card& card) {
                    return card.GetRank() == rank;
                });
}

} // namespace demo
