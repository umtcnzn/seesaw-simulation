# Seesaw Simulation - Insider Case

## Live Demo
[Click here to see the live project]

## 1. Thought Process & Design Decisions
Since external frameworks were not allowed, my main goal was to build a clean, pure JavaScript application. Coming from a background where I frequently use state management tools like Redux or Vue's reactivity, I applied a similar "Single Source of Truth" logic here using Vanilla JS. 

I created an `weights` array to hold the state of every dropped weight. Every time the user clicks the plank, a new object is pushed to this array, and the UI (DOM) is re-rendered based on this central state. This made it very easy to calculate total weights and save the progress to `localStorage`. 

For the visualization, I relied heavily on CSS. I used `transform-origin: center` for the plank so it rotates exactly from the pivot. I also added dynamic dimensions to the boxes (heavier boxes are visually larger) and a simple CSS drop animation to make the simulation feel more alive.

## 2. Trade-offs & Limitations
The biggest trade-off I had to make was modifying the suggested torque calculation formula. 

The case document suggested this formula for the tilt angle: `(rightTorque - leftTorque) / 10`. However, I calculated the distance in pixels. Since the plank is 600px wide, the maximum distance from the center is 300px. If I drop a 1kg weight at the very edge, the torque is 300. Using the suggested formula, `300 / 10 = 30` degrees. This meant even a tiny 1kg weight would instantly lock the seesaw at its maximum 30-degree limit, ruining the smooth animation.

To fix this limitation and create a more realistic physics feel, I scaled down the formula by dividing the torque difference by 100 instead of 10. This allowed the seesaw to tilt progressively and smoothly as more weights were added. 

## 3. AI Usage Policy Compliance
In compliance with the AI usage policy, I wrote the core logic, DOM manipulation, and state management completely by myself. 

I used AI (specifically a chatbot) as a brainstorming partner and mentor. I consulted it to debug a tricky CSS absolute/relative positioning issue with the falling weights, and we discussed the mathematical logic behind why the initial torque formula was causing the seesaw to snap directly to 30 degrees. The AI helped me validate my decision to change the divider to 100 to fix the physics scale.