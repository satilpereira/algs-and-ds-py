/**
 * Binds a State object to all elements with data-state="{stateName}".
 * @param {string} stateName
 * @param {State} stateObj
 */
export function bindStateToElements(stateName, stateObj) {
  function updateElements() {
    document
      .querySelectorAll(`[data-state="${stateName}"]`)
      .forEach((el) => {
        el.textContent = stateObj.value;
      });
  }
  // Initial update
  updateElements();
  // Subscribe to changes
  stateObj.subscribe(updateElements);
}
