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

        { Card(card_suit::Spades,   card_rank::Eight),   12 },
        { Card(card_suit::Spades,   card_rank::Ten),     212 },
        { Card(card_suit::Clubs,    card_rank::Ten),     20 },
        { Card(card_suit::Hearts,   card_rank::Ten),     170 },
        { Card(card_suit::Diamonds, card_rank::Ten),     344 }
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
        { Card(card_suit::Diamonds, card_rank::Ten), 244 },
        { Card(card_suit::Spades, card_rank::Ten),   112 },
        { Card(card_suit::Hearts, card_rank::Ten),   70 },
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