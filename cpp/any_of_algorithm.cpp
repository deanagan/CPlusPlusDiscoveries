#include "card.h"
#include <vector>
#include <algorithm>

// For brevity in our examples, we add this line
using namespace std;

int main()
{
    vector<Card> deck {
        Card("Spades", "9"),
        Card("Diamond", "9"),
        Card("Hearts", "5"),
        Card("Clubs", "9"),
        Card("Diamond", "7"),
    };
    Card cardToHave{"Hearts", "5"};
    const auto hasHearts5 = any_of(begin(deck), end(deck),
                                    [&cardToHave](const Card& card) {
                                        return cardToHave == card;
                                    });
    cout << boolalpha << hasHearts5 << "\n";
}