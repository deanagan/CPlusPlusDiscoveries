#include "partial_sort_demo.h"
#include "card.h"

#include <vector>

#include "gtest/gtest.h"
#include "gmock/gmock.h"


namespace test {
using namespace demo;

namespace {
    std::vector<PartialSortDemo::CardScorePair> kCardsAndValues {
        { Card("Spades","8"),   12 },
        { Card("Spades","10"),  212 },
        { Card("Clubs","10"),   20 },
        { Card("Heart","10"),   170 },
        { Card("Diamond","10"), 344 }
    };
}
class PartialSortDemoTest : public ::testing::Test
{
protected:

};


TEST_F(PartialSortDemoTest, ShouldExpect_ReducedValues_InTopCards)
{
    // Arrange
    PartialSortDemo sut(kCardsAndValues);

    // Act
   // const auto has_5_hearts = sut.HasCard(deck_, Card {"Hearts", "5"});

    // Assert
  //  EXPECT_TRUE(has_5_hearts);
}


} // namespace Test