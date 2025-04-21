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

export async function binarySearch(array, size, target) {
  wasmModule = await loadWasm();

  if (!wasmModule) {
    console.error("WASM module not loaded");
    return null;
  }
  const result = wasmModule._wasm_binary_search(array, size, target);
  return result;
}

export async function getStepCount() {
  wasmModule = await loadWasm();

  if (!wasmModule) {
    console.error("WASM module not loaded");
    return null;
  }
  return wasmModule._wasm_get_step_count();
}

export async function getStep(index) {
  wasmModule = await loadWasm();

  if (!wasmModule) {
    console.error("WASM module not loaded");
    return null;
  }
  const stepPtr = wasmModule._wasm_get_step(index);

  // Each field in Step is an int => 4 bytes => use HEAP32
  const baseIndex = stepPtr >> 2;

  return {
    low: wasmModule.HEAP32[baseIndex],
    high: wasmModule.HEAP32[baseIndex + 1],
    mid: wasmModule.HEAP32[baseIndex + 2],
  };
}
