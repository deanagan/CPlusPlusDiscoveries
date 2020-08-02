#include "partial_sort_demo.h"

#include <vector>
#include <algorithm>

#include "card.h"
#include <iostream>
namespace demo {

void PartialSortDemo::ReduceTopNCardScores(CardScores& cardScores, int top_n, int amount) const
{
    // Partial sort to get top n.
    std::partial_sort( begin(cardScores), next(begin(cardScores), top_n),
                  end(cardScores),
                  [](const CardScorePair& cardValue1, const CardScorePair& cardValue2) {
                      return cardValue1.second > cardValue2.second;
                  });
    // Reduce top n score by amount.
    for_each(begin(cardScores), next(begin(cardScores), top_n), [amount](CardScorePair& cardScore) {
        cardScore.second -= amount;
    });

}


} // namespace demo
