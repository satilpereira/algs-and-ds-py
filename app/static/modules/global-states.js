import { State, effect as globalEffect } from "./state.js";

const speed = new State(3);
const playback = new State("stop");
const theme = new State("light");

export { speed, playback, theme, globalEffect };
