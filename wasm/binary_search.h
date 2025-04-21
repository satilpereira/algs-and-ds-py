#pragma once

struct Step
{
  int low;
  int high;
  int mid;
};

void binary_search(int *array, int size, int target);

int get_step_count();

Step get_step(int index);