#include "has_card_demo.h"
#include "card.h"

#include <vector>

#include <gtest/gtest.h>
#include <gmock/gmock.h>

#include "card_values.h"

namespace test {

using namespace demo;
namespace {

    std::vector<Card> kStraight {
        Card(card_suit::Spades, card_rank::Seven),
        Card(card_suit::Spades, card_rank::Eight),
        Card(card_suit::Spades, card_rank::Nine),
        Card(card_suit::Spades, card_rank::Ten),
        Card(card_suit::Spades, card_rank::Jack),
    };
}
class HasCardDemoTest : public ::testing::Test
{
protected:

};


TEST_F(HasCardDemoTest, ShouldExpect_True_WhenCheckingQuads)
{
    // Arrange
    HasCardDemo sut;

    // Act
    const auto haveAllSameSuit = sut.DoAllCardsHaveSameSuit(kStraight, card_suit::Spades);
    const auto haveAllSameSuitSTL = sut.DoAllCardsHaveSameSuitSTL(kStraight, card_suit::Spades);

    // Assert
    EXPECT_TRUE(haveAllSameSuit);
    EXPECT_EQ(haveAllSameSuit, haveAllSameSuitSTL);
}

TEST_F(HasCardDemoTest, ShouldExpect_True_WhenAnyCardHasRank)
{
    // Arrange
    HasCardDemo sut;

    // Act
    const auto hasTen = sut.DoAnyCardsHaveRank(kStraight, card_rank::Ten);
    const auto hasTenSTL = sut.DoAnyCardsHaveRank(kStraight, card_rank::Ten);

    // Assert
    EXPECT_TRUE(hasTen);
    EXPECT_EQ(hasTen, hasTenSTL);
}

} // namespace test