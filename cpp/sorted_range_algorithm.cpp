#include "card.h"
#include <set>
#include <vector>
#include <map>
#include <algorithm>
#include <iterator>

using namespace std;

const std::map<std::string, int> CardSuitValueMap {
    {"Spades", 0},
    {"Clubs",  13},
    {"Hearts", 27},
    {"Diamond",39},
};

const std::map<std::string, int> CardRankValueMap {
    {"2", 1},
    {"3", 2},
    {"4", 3},
    {"5", 4},
    {"6", 5},
    {"7", 6},
    {"8", 7},
    {"9", 8},
    {"10",9},
    {"J", 10},
    {"Q", 11},
    {"K", 12},
    {"A", 13},
};

struct CardValueComparator {
    bool operator() (const Card& card1, const Card& card2) const {
        return (CardSuitValueMap.at(card1.GetSuit()) + CardRankValueMap.at(card1.GetRank())) <
               (CardSuitValueMap.at(card2.GetSuit()) + CardRankValueMap.at(card2.GetRank()));
    }
};

int main()
{
    vector<Card> deck {
        Card("Spades", "9"),
        Card("Diamond", "9"),
        Card("Hearts", "5"),
        Card("Clubs", "9"),
        Card("Diamond", "7"),
    };

    vector<Card> extra {
        Card("Hearts", "9"),
        Card("Diamond", "8"),
        Card("Clubs", "5")
    };

    vector<Card> fourOfNines {
        Card("Diamond", "9"),
        Card("Hearts", "9"),
        Card("Clubs", "9"),
        Card("Spades", "9")
    };

    vector<Card> fourOfQueen {
        Card("Diamond", "Q"),
        Card("Hearts", "Q"),
        Card("Clubs", "Q"),
        Card("Spades", "Q")
    };

    const auto printCardCollection = [](auto coll) {
        copy(begin(coll), end(coll), ostream_iterator<Card>(cout, ", "));
        cout << "\n";
    };

    set<Card, CardValueComparator> sortedCardsByValueSet;
    copy(begin(deck), end(deck), inserter(sortedCardsByValueSet, begin(sortedCardsByValueSet)));
    printCardCollection(sortedCardsByValueSet);

    copy(begin(extra), end(extra), inserter(sortedCardsByValueSet, begin(sortedCardsByValueSet)));
    printCardCollection(sortedCardsByValueSet);

    auto cardValueComparator = [](const Card& card1, const Card& card2) {
        return (CardSuitValueMap.at(card1.GetSuit()) + CardRankValueMap.at(card1.GetRank())) <
               (CardSuitValueMap.at(card2.GetSuit()) + CardRankValueMap.at(card2.GetRank()));
    };
    set<Card, decltype(cardValueComparator)> fourNineSet(cardValueComparator); // we don't need to pass lambda comparator in C++20
    copy(begin(fourOfNines), end(fourOfNines), inserter(fourNineSet, begin(fourNineSet)));


    const auto hasFourNines = includes(begin(sortedCardsByValueSet), end(sortedCardsByValueSet), begin(fourNineSet), end(fourNineSet), cardValueComparator);

    cout << "Deck has Four Nines: " << boolalpha << hasFourNines << "\n";

    using lambdaComparatorType = decltype(cardValueComparator);
    set<Card, lambdaComparatorType> fourQueenSet(cardValueComparator); // we don't need to pass lambda comparator in C++20
    copy(begin(fourOfQueen), end(fourOfQueen), inserter(fourQueenSet, begin(fourQueenSet)));

    const auto hasFourQueens = includes(begin(sortedCardsByValueSet), end(sortedCardsByValueSet), begin(fourQueenSet), end(fourQueenSet), cardValueComparator);

    cout << "Deck has Four Queens: " << boolalpha << hasFourQueens << "\n";

}