#include "rotate_deck_demo.h"
#include "card.h"

#include <vector>

#include <gtest/gtest.h>
#include <gmock/gmock.h>

#include "card_values.h"

namespace test {

using namespace demo;

class RotateDeckDemoTest : public ::testing::Test
{
protected:

};


TEST_F(RotateDeckDemoTest, ShouldExpect_Alternating_Cards)
{
    // Arrange
    RotateDeckDemo sut;
    std::vector<Card> deck {
        Card(card_suit::Spades,   card_rank::Nine),
        Card(card_suit::Spades,   card_rank::Nine),
        Card(card_suit::Spades,   card_rank::Nine),
        Card(card_suit::Spades,   card_rank::Nine),
        Card(card_suit::Diamonds, card_rank::Ten),
        Card(card_suit::Diamonds, card_rank::Ten),
        Card(card_suit::Diamonds, card_rank::Ten),
        Card(card_suit::Diamonds, card_rank::Ten),
    };

    // Act
    sut.AlternateCardsInHalf(deck);

    // Assert
    EXPECT_THAT(deck,
                ::testing::ElementsAre(
                    Card(card_suit::Spades,   card_rank::Nine),
                    Card(card_suit::Diamonds, card_rank::Ten),
                    Card(card_suit::Spades,   card_rank::Nine),
                    Card(card_suit::Diamonds, card_rank::Ten),
                    Card(card_suit::Spades,   card_rank::Nine),
                    Card(card_suit::Diamonds, card_rank::Ten),
                    Card(card_suit::Spades,   card_rank::Nine),
                    Card(card_suit::Diamonds, card_rank::Ten))
                );
}


} // namespace test