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
        Card(card_suit::Spades, card_rank::Nine),
        Card(card_suit::Diamonds, card_rank::Nine),
        Card(card_suit::Hearts, card_rank::Five),
        Card(card_suit::Clubs, card_rank::Nine),
        Card(card_suit::Diamonds, card_rank::Seven),
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
    const auto has_5_hearts = sut.HasCard(kDeck, Card {card_suit::Hearts, card_rank::Five});

    // Assert
    EXPECT_TRUE(has_5_hearts);
}

TEST_F(AnyOfDemoTest, ShouldExpect_False_WhenCardIsNotInCollection)
{
    // Arrange
    AnyOfDemo sut;

    // Act
    const auto has_8_spades = sut.HasCard(kDeck, Card {card_suit::Spades, card_rank::Eight});

    // Assert
    EXPECT_FALSE(has_8_spades);
}

} // namespace test