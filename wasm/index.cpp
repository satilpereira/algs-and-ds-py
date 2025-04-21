#include "hello.h"
#include "binary_search.h"
#include <emscripten.h>

// Export these functions to be called from JavaScript with C linkage
extern "C"
{
  // Note: We need to prefix the functions with underscore in EXPORTED_FUNCTIONS
  // but the actual C++ function name should not have the underscore
  EMSCRIPTEN_KEEPALIVE
  void wasm_hello()
  {
    hello();
  }

  EMSCRIPTEN_KEEPALIVE
  void wasm_binary_search(int *array, int size, int target)
  {
    ::binary_search(array, size, target);
  }

  EMSCRIPTEN_KEEPALIVE
  int wasm_get_step_count()
  {
    return ::get_step_count();
  }

  EMSCRIPTEN_KEEPALIVE
  Step wasm_get_step(int index)
  {
    return ::get_step(index);
  }
}