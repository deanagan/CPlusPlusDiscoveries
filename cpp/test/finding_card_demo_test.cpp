#include "finding_card_demo.h"
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
        { Card(card_suit::Spades,   card_rank::Ten)},
        { Card(card_suit::Clubs,    card_rank::Ten)},
        { Card(card_suit::Hearts,   card_rank::Ten)},
        { Card(card_suit::Diamonds, card_rank::Ten)},
        { Card(card_suit::Hearts,   card_rank::Six)}
    };
}

class FindingCardDemoTest : public ::testing::Test
{
protected:

};

TEST_F(FindingCardDemoTest, ShouldExpect_Card_Found_WhenUsingGetCard)
{
    // Arrange
    FindingCardDemo sut;
    Card card_to_find{card_suit::Diamonds, card_rank::Ten};

    // Act
    const auto card = sut.GetCard(kCards, card_to_find);

    // Assert
    EXPECT_FALSE(card.GetRank().empty());
    EXPECT_FALSE(card.GetSuit().empty());
    EXPECT_EQ(card_to_find, card);
}

TEST_F(FindingCardDemoTest, ShouldExpect_Card_Found_WhenUsingFind)
{
    // Arrange
    FindingCardDemo sut;
    Card card_to_find{card_suit::Diamonds, card_rank::Ten};

    // Act
    const auto card = sut.GetCardUsingFind(kCards, card_to_find);

    // Assert
    EXPECT_FALSE(card.GetRank().empty());
    EXPECT_FALSE(card.GetSuit().empty());
    EXPECT_EQ(card_to_find, card);
}

TEST_F(FindingCardDemoTest, ShouldExpect_Card_Found_WhenUsingFindBySuit)
{
    // Arrange
    FindingCardDemo sut;
    Card card_to_find (card_suit::Hearts, card_rank::Ten);

    // Act
    const auto card = sut.FindFirstWithSuit(kCards, card_to_find.GetSuit());

    // Assert
    EXPECT_FALSE(card.GetRank().empty());
    EXPECT_FALSE(card.GetSuit().empty());
    EXPECT_EQ(card_to_find, card);
}

TEST_F(FindingCardDemoTest, ShouldExpect_Card_Found_WhenUsingFindIfBySuit)
{
    // Arrange
    FindingCardDemo sut;
    Card card_to_find (card_suit::Hearts, card_rank::Ten);

    // Act
    const auto card = sut.FindFirstWithSuitSTL(kCards, card_to_find.GetSuit());

    // Assert
    EXPECT_FALSE(card.GetRank().empty());
    EXPECT_FALSE(card.GetSuit().empty());
    EXPECT_EQ(card_to_find, card);
}

} // namespace test