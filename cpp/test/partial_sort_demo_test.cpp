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
    PartialSortDemo sut_;

};


TEST_F(PartialSortDemoTest, ShouldExpect_ReducedValues_InTopCards)
{
    // Arrange
    PartialSortDemo::CardScores resultingSet (begin(kCardsAndValues), end(kCardsAndValues));
    const auto kTopN = 3;
    const auto kReduceAmount = 100;
    PartialSortDemo::CardScores expectedResult {
                    { Card(card_suit::Diamonds, card_rank::Ten), 244 },
                    { Card(card_suit::Spades, card_rank::Ten),   112 },
                    { Card(card_suit::Hearts, card_rank::Ten),   70  }};

    // Act
    sut_.ReduceTopNCardScores(resultingSet, kTopN, kReduceAmount);

    PartialSortDemo::CardScores result;
    result.assign(begin(resultingSet), next(begin(resultingSet), kTopN));

    // Assert
    EXPECT_THAT(result, ::testing::Eq(expectedResult));
}

TEST_F(PartialSortDemoTest, ShouldExpect_DeckDistributed_Alternating)
{
    // Arrange
    std::vector<Card> deck {
                        Card(card_suit::Diamonds, card_rank::Ace),
                        Card(card_suit::Spades, card_rank::Eight),
                        Card(card_suit::Hearts, card_rank::Queen),
                        Card(card_suit::Clubs, card_rank::Ten),
                        Card(card_suit::Hearts, card_rank::Nine),
                    };
    std::vector<Card> player1;
    std::vector<Card> player2;

    // Act
    sut_.DistributeCards(deck, player1, player2);

    // Assert
    EXPECT_THAT(player1,
                ::testing::UnorderedElementsAre(
                    Card(card_suit::Diamonds, card_rank::Ace),
                    Card(card_suit::Hearts, card_rank::Queen),
                    Card(card_suit::Hearts, card_rank::Nine)
                ));

    EXPECT_THAT(player2,
                ::testing::UnorderedElementsAre(
                    Card(card_suit::Spades, card_rank::Eight),
                    Card(card_suit::Clubs, card_rank::Ten)
                ));
}


} // namespace test