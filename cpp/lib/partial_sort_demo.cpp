#include "partial_sort_demo.h"

#include <vector>
#include <algorithm>

#include "card.h"
#include <iostream>
namespace demo {

void PartialSortDemo::ReduceTopNCardScores(CardScores& scores, int top_n, int amount) const
{
    // Partial sort to get top n.
    partial_sort( begin(scores), next(begin(scores), top_n),
                  end(scores),
                  [](const CardScorePair& csp1,
                     const CardScorePair& csp2) {
                      return csp1.second > csp2.second;
                  });
    // Reduce top n score by amount.
    for_each(begin(scores), next(begin(scores), top_n),
            [amount](CardScorePair& score) {
                score.second -= amount;
            });
}

void PartialSortDemo::DistributeCards(const std::vector<Card>& deck,
                                      std::vector<Card>& player1,
                                      std::vector<Card>& player2) const {

    // Note: [toggle=false] doesn't work for C++11, define toggle
    // before passing to lambda.
    partition_copy(begin(deck), end(deck),
                   back_inserter(player1),
                   back_inserter(player2),
                   [toggle = false](const Card&) mutable
                   { return toggle = !toggle; });

}


} // namespace demo
