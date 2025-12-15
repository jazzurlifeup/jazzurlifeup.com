// Import the pdfjsLib module from pdf.mjs
import * as pdfjsLib from '/pdfjs-4/build/pdf.mjs';

// Set up PDF.js worker using the module version
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdfjs-4/build/pdf.worker.mjs';

// URL of the PDF file
const url = '/gallery/7Gestaltgesetze.pdf';

// Variables for PDF rendering
let pdfDoc = null,
    pageNum = 1,
    pageRendering = false,
    pageNumPending = null,
    scale = 1.5,
    canvas = document.getElementById('pdf-render'),
    ctx = canvas.getContext('2d');

// Load PDF Document
pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
    pdfDoc = pdfDoc_;
    document.getElementById('page-count').textContent = pdfDoc.numPages;
    renderPage(pageNum);
});

// Render the page
function renderPage(num) {
    pageRendering = true;
    pdfDoc.getPage(num).then(page => {
        const viewport = page.getViewport({ scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };
        const renderTask = page.render(renderContext);

        renderTask.promise.then(() => {
            pageRendering = false;
            if (pageNumPending !== null) {
                renderPage(pageNumPending);
                pageNumPending = null;
            }
        });
    });

    document.getElementById('page-num').textContent = num;
}

// Queue a page render
function queueRenderPage(num) {
    if (pageRendering) {
        pageNumPending = num;
    } else {
        renderPage(num);
    }
}

// Show previous page
document.getElementById('prev-page').addEventListener('click', () => {
    if (pageNum <= 1) return;
    pageNum--;
    queueRenderPage(pageNum);
});

// Show next page
document.getElementById('next-page').addEventListener('click', () => {
    if (pageNum >= pdfDoc.numPages) return;
    pageNum++;
    queueRenderPage(pageNum);
});
