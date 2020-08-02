#pragma once

#include "card.h"
#include <vector>

namespace demo {

class CardGenerationDemo {

public:

    std::vector<std::string> GetAllSuitNamesExceptFirst(const std::vector<Card>& deck) const;
    std::vector<std::string> GetAllSuitNamesExceptFirstSTL(const std::vector<Card>& deck) const;
    std::vector<std::string> GetAllSuitNames(const std::vector<Card>& deck) const;
    std::vector<std::string> GetAllSuitNamesSTL(const std::vector<Card>& deck) const;
};

} // namespace demo
