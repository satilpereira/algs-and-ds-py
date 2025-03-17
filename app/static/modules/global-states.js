import { State, effect as globalEffect } from "./state.js";

const speed = new State(50);
const playback = new State("stop");

export { speed, playback, globalEffect };
