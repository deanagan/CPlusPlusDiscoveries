#include "card.h"
#include <set>
#include <vector>
#include <map>
#include <algorithm>
#include <iterator>

using namespace std;

const auto printCardCollection = [](auto coll) {
        copy(begin(coll), end(coll), ostream_iterator<Card>(cout, "\n"));
        cout << "\n";
    };

int main()
{
    vector<Card> cards {Card("Spades","9"),Card("Spades","9"),
                        Card("Spades","9"),Card("Spades","9"),
                        Card("Diamond","10"),Card("Diamond","10"),
                        Card("Diamond","10"),Card("Diamond","10")
                        };

    // Change cards to alternating.
    cout << "Before Rotation: \n";
    printCardCollection(cards);
    auto num9spades = count(begin(cards), end(cards), Card("Spades","9"));
    // moved points to the location of first 9 after rotation.
    // This is the first 9 at the end of the rotated collection.
    auto moved = rotate(next(begin(cards), num9spades/2), // destination spot
                        next(begin(cards), num9spades), // src spot
                        end(cards));

    cout << "Moved point to distance: " << distance(begin(cards), moved) << "\n";
    cout << "After Rotation: \n";
    printCardCollection(cards);

    moved = rotate(next(begin(cards), num9spades), // destination spot
                   moved, // src spot
                   end(cards));

    cout << "Moved point to distance: " << distance(begin(cards), moved) << "\n";
    cout << "After another rotation: \n";
    printCardCollection(cards);
}