#include "hello.h"
#include <iostream>
#include <emscripten.h>

void hello()
{
  std::cout << "Hello from WebAssembly!" << std::endl;
}