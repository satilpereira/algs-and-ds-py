#include "binary_search.h"
#include <vector>
#include <emscripten.h>

std::vector<Step> steps;

void binary_search(int *array, int size, int target)
{
  steps.clear(); // Clear previous steps
  int low = 0, high = size - 1;

  while (low <= high)
  {
    int mid = (low + high) / 2;
    steps.push_back({low, high, mid}); // Record the current step

    if (array[mid] == target)
    {
      return; // Target found, exit the function
    }
    else if (array[mid] < target)
    {
      low = mid + 1;
    }
    else
    {
      high = mid - 1;
    }
  }

  // If the loop exits, the target was not found
  // Optionally, you can add a final step to indicate the search ended
}
int get_step_count()
{
  return steps.size();
}

Step *get_step(int index)
{
  return &steps[index];
}
