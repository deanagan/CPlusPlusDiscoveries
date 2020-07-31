#pragma once

#include "card.h"
#include <vector>

namespace demo {

class PartialSortDemo {

public:
    // We would have wanted to derive from std::iterator but since it will
    // be deprecated, we'll just define this here.
    // We don't really use all 5 but portability is key.
    using iterator_category = std::output_iterator_tag;
    using value_type = void;
    using difference_type = void;
    using pointer = void;
    using reference = void;

    using CardScorePair = std::pair<Card, int>;
    explicit PartialSortDemo(const std::vector<CardScorePair>& vCardScores);
    void ReduceTopCardScores(int top_n, int amount);

private:
    std::vector<CardScorePair> card_scores_;
};

} // namespace demo
