import indexModule from "./_index.js";

let wasmModule = null;

export async function loadWasm() {
  try {
    wasmModule = await indexModule();
    console.log("WASM module loaded");
    return wasmModule;
  } catch (error) {
    console.error("Failed to load WASM module:", error);
    throw error;
  }
}

export async function hello() {
  wasmModule = await loadWasm();
  return wasmModule._wasm_hello();
}
