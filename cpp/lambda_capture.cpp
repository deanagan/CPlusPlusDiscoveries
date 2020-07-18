#include <iostream>

int z = 34;

int main()
{
    int x = 2;
    {
        int y = 3;
        int sum;
        // Capture by value default
        auto multiplierFn = [=] { return x*y*z; };
        auto sumFn = [&] { sum = x+y+z; };
        std::cout << "Product: " << multiplierFn() << "\n";
        sumFn();
        std::cout << "Sum: " << sum << "\n";
    }
}