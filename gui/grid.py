import pygame
from utils.settings import GRAY, WHITE
from gui.node import Node

class Grid:
  def __init__(self, size):
    self.size = size
    self.grid = []
    self.gap = 0
    self.start = None
    self.end = None
    self.rows = True

  def make_grid(self, rows, width):
    self.gap = width // rows
    row_width = width // rows
    self.grid = []
    for i in range(rows):
      self.grid.append([])
      for j in range(rows):
        node = Node(i, j, row_width, row_width)
        self.grid[i].append(node)
    
    return self.grid

  def draw_grid(self, screen, rows, width):
    gap = width // rows
    for i in range(rows):
      pygame.draw.line(screen, GRAY, (0, i * gap), (width, i * gap))
      for j in range(rows):
        pygame.draw.line(screen, GRAY, (j * gap, 0), (j * gap, width))      

  def draw(self, screen, rows, width):
    screen.fill(WHITE) 

    for row in self.grid:
      for node in row:
        node.draw(screen)

    self.draw_grid(screen, rows, width)
    
    pygame.display.flip()

  def get_clicked_pos(self, pos):
    gap = self.gap
    y, x = pos

    col = y // gap
    row = x // gap

    return row, col

  def create_maze(self):
    grid = self.grid
    
    # Set start and end nodes with random coordinates
    start = grid[1][1]
    end = grid[self.size - 2][self.size - 2]

    start.make('start')
    end.make('end')

    self.start = start
    self.end = end