#include "counting_card_demo.h"
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
    const std::vector<demo::Card> kCards {

        { Card(card_suit::Spades,   card_rank::Eight)},
        { Card(card_suit::Spades,   card_rank::Nine)},
        { Card(card_suit::Clubs,    card_rank::Ten)},
        { Card(card_suit::Hearts,   card_rank::Ten)},
        { Card(card_suit::Diamonds, card_rank::Ten)},
        { Card(card_suit::Hearts,   card_rank::Six)},
        { Card(card_suit::Spades,   card_rank::Nine)}
    };
}

class CountingCardDemoTest : public ::testing::Test
{
protected:
    CountingCardDemo sut_;
};

TEST_F(CountingCardDemoTest, ShouldExpect_CorrectCardCount_WhenUsingCountCard)
{
    // Arrange
    Card card_to_count{card_suit::Spades, card_rank::Nine};

    // Act
    const auto count = sut_.CountCard(kCards, card_to_count);

    // Assert
    EXPECT_EQ(2, count);
}

TEST_F(CountingCardDemoTest, ShouldExpect_CorrectCardCount_WhenUsingCountCardSTL)
{
    // Arrange
    Card card_to_count{card_suit::Spades, card_rank::Nine};

    // Act
    const auto count = sut_.CountCard(kCards, card_to_count);

    // Assert
    EXPECT_EQ(2, count);
}

TEST_F(CountingCardDemoTest, ShouldExpect_Card_Found_WhenUsingCountByRank)
{
    // Arrange
    Card card_to_count{card_suit::Spades, card_rank::Nine};

    // Act
    const auto count = sut_.CountCardWithRank(kCards, card_to_count.GetRank());

    // Assert
    EXPECT_EQ(2, count);
}

TEST_F(CountingCardDemoTest, ShouldExpect_Card_Found_WhenUsingCountByRankSTL)
{
    // Arrange
    Card card_to_count{card_suit::Spades, card_rank::Nine};

    // Act
    const auto countSTL = sut_.CountCardWithRankSTL(kCards, card_to_count.GetRank());
    const auto count = sut_.CountCardWithRank(kCards, card_to_count.GetRank());

    // Assert
    EXPECT_EQ(2, count);
    EXPECT_EQ(2, countSTL);
}

TEST_F(CountingCardDemoTest, ShouldExpect_Total_DeckScore)
{
    // Arrange
    CountingCardDemo::CardScores cs {
        { Card(card_suit::Spades,   card_rank::Eight), 1},
        { Card(card_suit::Spades,   card_rank::Nine), 2},
        { Card(card_suit::Clubs,    card_rank::Ten), 3},
        { Card(card_suit::Hearts,   card_rank::Ten), 4},
    };

    // Act
    const auto score = sut_.GetTotalDeckValue(cs);
    const auto scoreSTL = sut_.GetTotalDeckValueSTL(cs);

    // Assert
    EXPECT_EQ(10, score);
    EXPECT_EQ(10, scoreSTL);
}

} // namespace test