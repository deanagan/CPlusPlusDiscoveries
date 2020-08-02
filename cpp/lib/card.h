#pragma once
#include <iterator>
#include <string>

namespace demo {

   class Card {
   public:
      Card(std::string suit, std::string rank);
      Card() = default;

      bool operator==(const Card& other) const;
      bool operator!=(const Card& other) const;
      bool operator<(const Card& other) const;

      std::string GetSuit() const { return suit_; }
      std::string GetRank() const { return rank_; }

      friend std::ostream& operator<<(std::ostream& os, const Card& card);
   private:
      std::string suit_;
      std::string rank_;
   };

} // namespace demo