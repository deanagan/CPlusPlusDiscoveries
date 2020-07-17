#include <iostream>
#include <algorithm>
#include <iterator>
#include <vector>
#include <string>

// Declaring globally for demo convenience
using namespace std;

class Card
{
public:
   Card(string suit = "", string rank = "")
       : m_suit(move(suit)), m_rank(move(rank))
   {
   }

   bool operator==(const Card &other) const
   {
      return m_suit == other.m_suit && m_rank == other.m_rank;
   }

   string GetSuit() const { return m_suit; }
   string GetRank() const { return m_rank; }

   friend ostream &operator<<(ostream &os, const Card &card);
private:
   string m_suit;
   string m_rank;
};

ostream &operator<<(ostream &os, const Card &card)
{
   return os << card.GetRank() << " of " << card.GetSuit();
}

vector<Card> deck{

    Card("Spades", "9"),
    Card("Diamond", "9"),
    Card("Spades", "9"),
    Card("Hearts", "5"),
    Card("Clubs", "3"),
    Card("Diamond", "7"),

};

void CountForLoop()
{
   auto numSpades9 = 0;
   // for-loop count 9-Spades
   Card cardToCount{"Spades", "9"};	
   for (auto i = 0U; i < deck.size(); ++i) {	
      if (deck[i] == cardToCount) {	
      ++numSpades9;	
      }	
   }

   cout << "Total Nine Spades: " << numSpades9 << "\n";
}

int main()
{
   CountForLoop();

   
}