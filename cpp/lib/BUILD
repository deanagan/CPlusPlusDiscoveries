cc_library(
    name = "library_under_test",
    srcs = glob(["**/*.cpp"]),
    hdrs = glob(["**/*.h"]),
    copts = ["-Wall"],
    visibility = ["//visibility:public"],
    deps = [
        "@boost//:algorithm",
    ],
)
