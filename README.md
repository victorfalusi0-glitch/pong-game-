# Pong Game

A classic Pong game implementation using vanilla HTML, CSS, and JavaScript.

## Features

- **Player vs Computer**: Play against an AI opponent
- **Mouse & Keyboard Control**: Control the left paddle using your mouse position or arrow keys (↑/↓)
- **Bouncing Ball**: Realistic ball physics with speed and spin mechanics
- **Collision Detection**: Accurate collision detection for paddles and walls
- **Scoreboard**: Real-time score tracking for both player and computer
- **Visual Effects**: Neon-style graphics with glow effects
- **Difficulty Scaling**: Ball speed increases as rallies progress

## How to Play

1. Open `index.html` in your web browser
2. Move your mouse vertically to control the left (green) paddle
3. Alternatively, use **Arrow Up** and **Arrow Down** keys to move the paddle
4. Get the ball past the computer's paddle to score points
5. The computer will try to do the same to you

## Controls

- **Mouse Movement**: Move the left paddle vertically
- **Arrow Up**: Move paddle up
- **Arrow Down**: Move paddle down

## Game Rules

- The ball bounces off the top and bottom walls
- The ball bounces off the paddles with spin based on where it hits
- If the ball passes your paddle, the computer scores a point
- If the ball passes the computer's paddle, you score a point
- The ball speed increases slightly with each paddle collision

## Technical Details

- **Canvas**: 800x400 pixels
- **Physics**: Realistic ball movement with collision detection
- **AI**: Computer opponent with adjustable difficulty
- **Performance**: Uses requestAnimationFrame for smooth gameplay

## Customization

You can customize the game by modifying the following values in `game.js`:

- `paddle.speed`: How fast the paddles move
- `ball.maxSpeed`: Maximum ball speed
- `difficulty`: Computer AI difficulty level (0-1)

## Browser Compatibility

Works on all modern browsers that support HTML5 Canvas and ES6 JavaScript.
