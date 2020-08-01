#include "partial_sort_demo.h"
#include "card.h"

#include <vector>
#include <iterator>
#include <exception>

#include <gtest/gtest.h>
#include <gmock/gmock.h>

#include "card_values.h"

namespace test {
using namespace demo;

namespace {
    const std::vector<PartialSortDemo::CardScorePair> kCardsAndValues {

        { Card(card_suit::kSpades, card_rank::kEight),   12 },
        { Card(card_suit::kSpades, card_rank::kTen),  212 },
        { Card(card_suit::kClubs, card_rank::kTen),   20 },
        { Card(card_suit::kHearts, card_rank::kTen),   170 },
        { Card(card_suit::kDiamonds, card_rank::kTen), 344 }
    };
}
class PartialSortDemoTest : public ::testing::Test
{
protected:

};


TEST_F(PartialSortDemoTest, ShouldExpect_ReducedValues_InTopCards)
{
    // Arrange
    PartialSortDemo::CardScores expectedCards
    {
        { Card(card_suit::kDiamonds,"10"), 244 },
        { Card(card_suit::kSpades,"10"),   112 },
        { Card(card_suit::kHearts,"10"),   70 },
    };
    PartialSortDemo::CardScores resultingSet (begin(kCardsAndValues), end(kCardsAndValues));
    PartialSortDemo sut;

    // Act
    sut.ReduceTopNCardScores(resultingSet, 3, 100);
    PartialSortDemo::CardScores result;

    result.assign(begin(resultingSet), next(begin(resultingSet), 3));

    // Assert
    EXPECT_THAT(expectedCards, ::testing::Eq(result));
}


} // namespace test