let documentToolsPromise = null;

export function loadDocumentTools() {
  if (globalThis.YarnchaDocumentTools) return Promise.resolve(globalThis.YarnchaDocumentTools);
  if (!documentToolsPromise) {
    documentToolsPromise = import("./document-tools.js")
      .then(() => globalThis.YarnchaDocumentTools)
      .catch(error => {
        documentToolsPromise = null;
        globalThis.dispatchEvent?.(new CustomEvent("yarncha:document-tools-error", { detail: error }));
        throw error;
      });
  }
  return documentToolsPromise;
}

globalThis.YarnchaDocumentToolsLoader = Object.freeze({ load: loadDocumentTools });
