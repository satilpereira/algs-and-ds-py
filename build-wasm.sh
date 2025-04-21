#!/bin/bash

# WASM build script for task-stack
# Usage: ./build-wasm.sh [additional emcc options]

# Check if emcc is installed
if ! command -v emcc &> /dev/null
then
    echo "❌ emcc could not be found. Please install Emscripten."
    exit 1
fi

# This script sets the shell to exit immediately if any command exits with a non-zero status.
set -e

# Log the start of the build process
echo "Building WASM modules..."

# Define the emcc flags
EMCC_FLAGS="-O3 \
  -sMODULARIZE=1 \
  -sEXPORT_NAME=indexModule \
  -sEXPORT_ES6=1 \
  -sENVIRONMENT=web \
  -sALLOW_MEMORY_GROWTH=1 \
  -lembind \
  -sEXPORTED_RUNTIME_METHODS=['ccall','cwrap']"

# Define exported functions with wasm_ prefix to match our implementation
EXPORTED_FUNCTIONS='["_wasm_hello", "_wasm_binary_search", "_wasm_get_step_count", "_wasm_get_step", "_malloc", "_free"]'

EMCC_FILES=(
  "wasm/index.cpp"
  "wasm/hello.cpp"
  "wasm/binary_search.cpp"
)

# Base command with required parameters
# Change output file to _index.js to avoid name collision
EMCC_CMD="emcc ${EMCC_FILES[@]} -o app/static/wasm/_index.js -s EXPORTED_FUNCTIONS='$EXPORTED_FUNCTIONS' $EMCC_FLAGS"

# Append any additional arguments
if [ $# -gt 0 ]; then
  EMCC_CMD="$EMCC_CMD $*"
fi

# Print the command being executed
echo "Executing: $EMCC_CMD"

# Execute the command
eval $EMCC_CMD

# Check if compilation succeeded
if [ $? -eq 0 ]; then
  echo "✅ WASM build completed successfully"
else
  echo "❌ WASM build failed"
  exit 1
fi
