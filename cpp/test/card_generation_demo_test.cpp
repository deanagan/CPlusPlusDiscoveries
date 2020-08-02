#include "card_generation_demo.h"
#include "card.h"

#include <vector>

#include <gtest/gtest.h>
#include <gmock/gmock.h>

#include "card_values.h"

namespace test {

using namespace demo;
namespace {

    std::vector<Card> kQuads {
        Card(card_suit::Spades, card_rank::Seven),
        Card(card_suit::Spades, card_rank::Jack),
        Card(card_suit::Hearts, card_rank::Jack),
        Card(card_suit::Clubs, card_rank::Jack),
        Card(card_suit::Diamonds, card_rank::Jack),
    };
}
class CardGenerationDemoTest : public ::testing::Test
{
protected:

};


TEST_F(CardGenerationDemoTest, ShouldExpect_AllSuits_WhenCheckingQuadsExceptKicker)
{
    // Arrange
    CardGenerationDemo sut;

    // Act
    const auto suits = sut.GetAllSuitNamesExceptFirst(kQuads);
    const auto suitsSTL = sut.GetAllSuitNamesExceptFirstSTL(kQuads);

    // Assert
    EXPECT_THAT(suits,
                ::testing::UnorderedElementsAre(
                    card_suit::Spades,
                    card_suit::Hearts,
                    card_suit::Clubs,
                    card_suit::Diamonds
                ));
    EXPECT_THAT(suitsSTL,
                ::testing::UnorderedElementsAre(
                    card_suit::Spades,
                    card_suit::Hearts,
                    card_suit::Clubs,
                    card_suit::Diamonds
                ));
}

TEST_F(CardGenerationDemoTest, ShouldExpect_AllSuits_FromQuads)
{
    // Arrange
    CardGenerationDemo sut;

    // Act
    const auto suits = sut.GetAllSuitNames(kQuads);
    const auto suitsSTL = sut.GetAllSuitNamesSTL(kQuads);

    // Assert
    EXPECT_THAT(suits,
                ::testing::UnorderedElementsAre(
                    card_suit::Spades,
                    card_suit::Spades,
                    card_suit::Hearts,
                    card_suit::Clubs,
                    card_suit::Diamonds
                ));
    EXPECT_THAT(suitsSTL,
                ::testing::UnorderedElementsAre(
                    card_suit::Spades,
                    card_suit::Spades,
                    card_suit::Hearts,
                    card_suit::Clubs,
                    card_suit::Diamonds
                ));
}

} // namespace test