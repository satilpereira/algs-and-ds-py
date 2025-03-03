export function updateQueryParams(key, value) {
  const params = new URLSearchParams(window.location.search);
  params.set(key, value);
  const newUrl = `${window.location.pathname}?${params.toString()}`;

  window.history.pushState({ path: newUrl }, "", newUrl);

  fetch(newUrl, { method: "GET" })
    .then((response) => {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return response.json();
      } else {
        return response.text(); // If not JSON, return text to inspect the response
      }
    })
    .then((data) => {
      console.log("Updated params");
    })
    .catch((error) => {
      console.error("Error updating params");
    });
}
