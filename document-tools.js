import * as pdfjsLib from "pdfjs-dist/build/pdf.mjs";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.mjs?url";
import { createWorker } from "tesseract.js";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

const TESSERACT_VERSION = "6.0.1";
const TESSERACT_CORE_VERSION = "6.0.0";
const OCR_RUNTIME = {
  workerPath: `https://cdn.jsdelivr.net/npm/tesseract.js@${TESSERACT_VERSION}/dist/worker.min.js`,
  corePath: `https://cdn.jsdelivr.net/npm/tesseract.js-core@${TESSERACT_CORE_VERSION}`,
  langPath: "https://tessdata.projectnaptha.com/4.0.0"
};

async function createOcrWorker(languages, logger) {
  return createWorker(languages, 1, { ...OCR_RUNTIME, logger });
}

window.YarnchaDocumentTools = Object.freeze({ pdfjsLib, createOcrWorker, ocrRuntime: OCR_RUNTIME });
window.dispatchEvent(new CustomEvent("yarncha:document-tools-ready"));

