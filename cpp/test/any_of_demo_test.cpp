#include "any_of_demo.h"
#include "card.h"

#include <vector>

#include "gtest/gtest.h"
#include "gmock/gmock.h"


namespace test {

using namespace demo;
namespace {
    std::vector<Card> kDeck {
        Card("Spades", "9"),
        Card("Diamond", "9"),
        Card("Hearts", "5"),
        Card("Clubs", "9"),
        Card("Diamond", "7"),
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
    const auto has_5_hearts = sut.HasCard(kDeck, Card {"Hearts", "5"});

    // Assert
    EXPECT_TRUE(has_5_hearts);
}

TEST_F(AnyOfDemoTest, ShouldExpect_False_WhenCardIsNotInCollection)
{
    // Arrange
    AnyOfDemo sut;

    // Act
    const auto has_8_spades = sut.HasCard(kDeck, Card {"Spades", "8"});

    // Assert
    EXPECT_FALSE(has_8_spades);
}

} // namespace test