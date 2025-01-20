import pygame
from gui.grid import Grid
# from gui.events import handle_events
from utils.settings import SCREEN_WIDTH, SCREEN_HEIGHT, ROWS

def main():
    pygame.init()
    screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
    pygame.display.set_caption("Algorithm Visualizer")
    clock = pygame.time.Clock()

    grid = Grid(ROWS)  # Example grid size
    grid.make_grid(ROWS, SCREEN_WIDTH)
    running = True
    started = False
    last_clicked_node = None
    
    while running:
        grid.draw(screen, ROWS, SCREEN_WIDTH) # Draw the grid

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

            if started:
                continue

            if pygame.mouse.get_pressed()[0]: # Left mouse button
                pos = pygame.mouse.get_pos()
                row, col = grid.get_clicked_pos(pos)
                node = grid.grid[row][col]

                if last_clicked_node != node:
                    if not grid.start and node != grid.end:
                        grid.start = node
                        grid.start.make('start')

                    elif not grid.end and node != grid.start:
                        grid.end = node
                        grid.end.make('end')

                    elif node != grid.start and node != grid.end:
                        node.make('barrier')
                    
                    last_clicked_node = node  # Update last clicked node


            elif pygame.mouse.get_pressed()[2]: # Right mouse button
                pos = pygame.mouse.get_pos()
                row, col = grid.get_clicked_pos(pos)
                node = grid.grid[row][col]

                if node == grid.start:
                    grid.start = None
                
                elif node == grid.end:
                    grid.end = None
                
                node.reset()
                last_clicked_node = node

            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE and not started:
                    if grid.start and grid.end:
                        started = True
                
                if event.key == pygame.K_m:
                    grid.create_maze()

        pygame.display.flip()
        clock.tick(60)

    pygame.quit()

if __name__ == "__main__":
    main()
