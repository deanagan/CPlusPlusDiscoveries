#include "finding_card_demo.h"

#include <vector>
#include <algorithm>

#include "card.h"


namespace demo {

Card FindingCardDemo::GetCard(const std::vector<Card>& deck, const Card& card_to_find) const {

    Card foundCard;

    for(const auto& card : deck) {
        if (card == card_to_find) {
            foundCard = card;
            break;
        }
    }
    return foundCard;
}

Card FindingCardDemo::GetCardUsingFind(const std::vector<Card>& deck, const Card& card_to_find) const {

    const auto found = find(begin(deck), end(deck), card_to_find);

    return (found != end(deck)) ? *found : Card{};
}

Card FindingCardDemo::FindFirstWithSuit(const std::vector<Card>& deck, const std::string& suit) const {
    Card foundCard;
    for(const auto& card : deck) {
        if (card.GetSuit() == suit) {
            foundCard = card;
            break;
        }
    }
    return foundCard;
}

Card FindingCardDemo::FindFirstWithSuitSTL(const std::vector<Card>& deck, const std::string& suit) const {

    auto found = find_if(begin(deck), end(deck),
                [&suit] (const Card& card) {
                  return card.GetSuit() == suit;
              });
    return (found != end(deck)) ? *found : Card{};
}

} // namespace demo
