import pygame
from utils.settings import GRAY, RED, WHITE, GREEN, BLUE, CYAN, DARK_GRAY, ORANGE

class Node:
  def __init__(self, row, col, width, height):
    self.row = row
    self.col = col
    self.x = col * width
    self.y = row * height
    self.width = width
    self.height = height
    self.total_rows = 0
    self.neighbors = []
    self.color = WHITE

  def draw(self, screen):
    pygame.draw.rect(screen, self.color, (self.x, self.y, self.width, self.height))

  def get_pos(self):
    return self.row, self.col

  def is_state(self, state):
    state_color_map = {
      'closed': RED,
      'open': WHITE,
      'barrier': DARK_GRAY,
      'start': BLUE,
      'end': ORANGE,
      'path': CYAN
    }
    if state not in state_color_map:
      raise ValueError(f"Unknown state: {state}")
    return self.color == state_color_map[state]

  def make(self, state):
    state_color_map = {
      'closed': RED,
      'open': WHITE,
      'barrier': DARK_GRAY,
      'start': BLUE,
      'end': ORANGE,
      'path': CYAN
    }

    if state not in state_color_map:
      raise ValueError(f"Unknown state: {state}")
    self.color = state_color_map[state]

  def reset(self):
    self.color = WHITE