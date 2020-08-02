#include "counting_card_demo.h"

#include <vector>
#include <algorithm>
#include <numeric>

#include "card.h"

namespace demo
{

    int CountingCardDemo::CountCard(const std::vector<Card> &deck, const Card &card_to_count) const
    {

        int count = 0;

        for (auto i = 0U; i < deck.size(); ++i)
        {
            if (deck[i] == card_to_count)
            {
                ++count;
            }
        }

        return count;
    }

    int CountingCardDemo::CountCardSTL(const std::vector<Card> &deck, const Card &card_to_count) const
    {

        return count(begin(deck), end(deck), card_to_count);
    }

    int CountingCardDemo::CountCardWithRank(const std::vector<Card> &deck, const std::string &rank) const
    {

        int count = 0;

        for (auto i = 0U; i < deck.size(); ++i)
        {
            if (deck[i].GetRank() == rank)
            {
                ++count;
            }
        }

        return count;
    }

    int CountingCardDemo::CountCardWithRankSTL(const std::vector<Card> &deck, const std::string &rank) const
    {

        return count_if(begin(deck), end(deck),
                        [&rank](const Card &card) {
                            return card.GetRank() == rank;
                        });
    }

    int CountingCardDemo::GetTotalDeckValue(const CardScores &scores) const
    {
        unsigned int total = 0;
        for (const auto &csp : scores)
        {
            total += csp.second;
        }
        return total;
    }

    int CountingCardDemo::GetTotalDeckValueSTL(const CardScores &scores) const
    {
        return accumulate(begin(scores), end(scores), 0,
                    [](const auto total, const auto& current) {
                        return total + current.second;
                    });
    }

} // namespace demo
