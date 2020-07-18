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
