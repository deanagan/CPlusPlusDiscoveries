#include "card.h"
#include <set>
#include <vector>
#include <map>
#include <algorithm>
#include <iterator>
#include <string>
#include <iostream>

using namespace std;


struct CardScore
{
    Card card;
    int score;
};

ostream& operator<<(ostream& os, const CardScore& cardScore)
{
   return os << cardScore.card << " with score of " << cardScore.score;
}

int main()
{
    vector<CardScore> cardsAndValues {
                         { Card("Spades","8"),   12 },
                         { Card("Spades","10"),  212 },
                         { Card("Clubs","10"),   20 },
                         { Card("Heart","10"),   170 },
                         { Card("Diamond","10"), 344 }
                        };

    // Show cardsAndValues
    cout << "Before Processing: \n";
    copy(begin(cardsAndValues), end(cardsAndValues), ostream_iterator<CardScore>(cout, "\n"));

    // Get top 3 with largest values
    partial_sort( begin(cardsAndValues),
                  next(begin(cardsAndValues), 3),
                  end(cardsAndValues),
                  [](const CardScore& cardValue1, const CardScore& cardValue2) {
                      return cardValue1.score > cardValue2.score;
                  });

    // Reduce top 3 score by 100.
    for_each(begin(cardsAndValues), next(begin(cardsAndValues), 3), [](CardScore& cardScore) { cardScore.score -= 100; });

    // Show cardsAndValues
    cout << "\n After Processing: \n";
    copy(begin(cardsAndValues), end(cardsAndValues), ostream_iterator<CardScore>(cout, "\n"));
}