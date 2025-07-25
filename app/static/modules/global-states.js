import { State, effect as globalEffect } from "./state.js";

const speed = new State(3);
const playback = new State("stop");
const theme = new State("light");
const target = new State(0);
const algoType = new State("search"); // Default algorithm type e.g., "search", "sort", "graph"

export { speed, playback, theme, target, globalEffect };
