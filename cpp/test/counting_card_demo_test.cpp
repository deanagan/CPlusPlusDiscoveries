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

};

TEST_F(CountingCardDemoTest, ShouldExpect_CorrectCardCount_WhenUsingCountCard)
{
    // Arrange
    CountingCardDemo sut;
    Card card_to_count{card_suit::Spades, card_rank::Nine};

    // Act
    const auto count = sut.CountCard(kCards, card_to_count);

    // Assert
    EXPECT_EQ(2, count);
}

TEST_F(CountingCardDemoTest, ShouldExpect_CorrectCardCount_WhenUsingCountCardSTL)
{
    // Arrange
    CountingCardDemo sut;
    Card card_to_count{card_suit::Spades, card_rank::Nine};

    // Act
    const auto count = sut.CountCard(kCards, card_to_count);

    // Assert
    EXPECT_EQ(2, count);
}

TEST_F(CountingCardDemoTest, ShouldExpect_Card_Found_WhenUsingCountByRank)
{
    // Arrange
    CountingCardDemo sut;
    Card card_to_count{card_suit::Spades, card_rank::Nine};

    // Act
    const auto count = sut.CountCardWithRank(kCards, card_to_count.GetRank());

    // Assert
    EXPECT_EQ(2, count);
}

TEST_F(CountingCardDemoTest, ShouldExpect_Card_Found_WhenUsingCountByRankSTL)
{
    // Arrange
    CountingCardDemo sut;
    Card card_to_count{card_suit::Spades, card_rank::Nine};

    // Act
    const auto count = sut.CountCardWithRankSTL(kCards, card_to_count.GetRank());

    // Assert
    EXPECT_EQ(2, count);
}

} // namespace test