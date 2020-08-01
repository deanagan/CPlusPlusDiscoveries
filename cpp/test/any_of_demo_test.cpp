#include "any_of_demo.h"
#include "card.h"

#include <vector>

#include <gtest/gtest.h>
#include <gmock/gmock.h>

#include "card_values.h"

namespace test {

using namespace demo;
namespace {
    std::vector<Card> kDeck {
        Card(card_suit::kSpades, card_rank::kNine),
        Card(card_suit::kDiamonds, card_rank::kNine),
        Card(card_suit::kHearts, card_rank::kFive),
        Card(card_suit::kClubs, card_rank::kNine),
        Card(card_suit::kDiamonds, card_rank::kSeven),
    };
}
class AnyOfDemoTest : public ::testing::Test
{
protected:

};


TEST_F(AnyOfDemoTest, ShouldExpect_True_WhenCardIsInCollection)
{
    // Arrange
    AnyOfDemo sut;

    // Act
    const auto has_5_hearts = sut.HasCard(kDeck, Card {card_suit::kHearts, card_rank::kFive});

    // Assert
    EXPECT_TRUE(has_5_hearts);
}

TEST_F(AnyOfDemoTest, ShouldExpect_False_WhenCardIsNotInCollection)
{
    // Arrange
    AnyOfDemo sut;

    // Act
    const auto has_8_spades = sut.HasCard(kDeck, Card {card_suit::kSpades, card_rank::kEight});

    // Assert
    EXPECT_FALSE(has_8_spades);
}

} // namespace test