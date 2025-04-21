#include "binary_search.h"
#include <vector>
#include <emscripten.h>

std::vector<Step> steps;

void binary_search(int *array, int size, int target)
{
  steps.clear();
  int low = 0, high = size - 1;

  while (low <= high)
  {
    int mid = (low + high) / 2;
    steps.push_back({low, high, mid});

    if (array[mid] == target)
      break;
    else if (array[mid] < target)
      low = mid + 1;
    else
      high = mid - 1;
  }
}

int get_step_count()
{
  return steps.size();
}

Step get_step(int index)
{
  return steps[index];
}
