#include "card_generation_demo.h"

#include <vector>
#include <algorithm>

#include "card.h"


namespace demo {

std::vector<std::string> CardGenerationDemo::GetAllSuitNamesExceptFirst(const std::vector<Card>& deck) const {
    std::vector<std::string> suits;

    bool first = true;
    for(const auto& card : deck) {
        if (!first) {
            suits.push_back(card.GetSuit());
        } else {
            first = false;
        }
    }

    return suits;
}

std::vector<std::string> CardGenerationDemo::GetAllSuitNamesExceptFirstSTL(const std::vector<Card>& deck) const {
    std::vector<std::string> suits;
    transform(next(begin(deck)), end(deck), back_inserter(suits),
                [](const Card& card) {
                    return card.GetSuit();
                });
    return suits;
}

std::vector<std::string> CardGenerationDemo::GetAllSuitNames(const std::vector<Card>& deck) const {
    std::vector<std::string> suits;
    for(const auto& card : deck) {
        suits.push_back(card.GetSuit());
    }
    return suits;
}

std::vector<std::string> CardGenerationDemo::GetAllSuitNamesSTL(const std::vector<Card>& deck) const {
    std::vector<std::string> suits;
    std::transform(begin(deck), end(deck), back_inserter(suits),
            [](const Card& card) {
                return card.GetSuit();
            });
    return suits;
}

} // namespace demo
