# Typical Algorithm Sequence Diagram
``` mermaid
sequenceDiagram
    participant UserCode
    participant Execution Policy
    UserCode->>STL: Pass begin and end iterators of container
    STL-> Execution Policy: C++ 17 Concurrency
    loop algorithm
        STL->>STL: process each item!
        STL-->>UserCode: Call predicates or     operator function

    end
    Note right of Boost Library: Alternative Library



    STL-->>UserCode: Result
```

# Graphic Representation of Vector
``` mermaid
graph LR
    start["std::begin"]  --> a["King #9829;"];

    subgraph std::vector<Card> cards
        a["King #9829;"]  --- b["King #9830;"];
        b["King #9830;"]  --- c["King #9828;"];
        c["King #9828;"]  --- d["King #9827;"];
    end

    d["King #9827;"]  --- e[" "];
    f[std::end] --> e;


```

## Typical Flowchart for an STL Algorithm
``` flow
st=>start: Start|past:>[blank]
e=>end: End|future:>

op1=>operation: Container not empty|past
op2=>operation: Done|current
sub1=>subroutine: Invoke Operator Function/Predicate|invalid
cond=>condition: Yes
or No?|approved:>
c2=>condition: Exception|rejected
io=>inputoutput: throw something...|future

st->op1(right)->cond
cond(yes, right)->c2
cond(no)->sub1(left)->op1
c2(yes)->io->e
c2(no)->op2->e
```