cc_test(
    name = "tests",
    srcs = glob(["*.cpp", "*.h"]),
    copts = ["-Ilib"],
    deps = [
        "//lib:library_under_test",
        "@googletest//:gtest_main",
    ],
)
