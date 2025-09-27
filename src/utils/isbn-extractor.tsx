import ISBN from "isbn3";
import EPub from "epub";

interface ContentGenerator {
  (content: string | ArrayBuffer ) : AsyncGenerator<string, string, string>,
}

export async function extractIsbn(fileContent: string | ArrayBuffer | null, contentType: string): Promise<string | null> {
  if (fileContent == null) {
    return null;
  }

  let contentFunction: ContentGenerator;

  switch (contentType) {
    case 'application/pdf':
      return extractFirstIsbnFrom(getPdfText(fileContent));

    case 'application/epub+zip':
      return extractFirstIsbnFrom(getEpubText(fileContent));
  
    default:
      return null;
  }
}

async function extractFirstIsbnFrom(contentGenerator: AsyncGenerator<string, string, string>): Promise<string | null> {

  let content : IteratorResult<string, string>;
  for(let contentCount = 0; (content = await contentGenerator.next()) && contentCount < 10; ++contentCount) {
    const isbnMatch = content.value.match(/((978[-– ])?[0-9][0-9-– ]{10}[-– ][0-9xX])|((978)?[0-9]{9}[0-9Xx])/g);

    if (isbnMatch) {
      for(let i=0; i < isbnMatch.length; ++i) {
        const isbn = ISBN.asIsbn13(isbnMatch[i].toString());
        if (isbn) {
          return isbn
        }
      }
    }
  }

  return null;
}

async function* getEpubText(content: string | ArrayBuffer ) : AsyncGenerator<string, string, string> {
  const buf = (typeof content == "string") ? Buffer.from(content) : Buffer.from(content);
  // @ts-expect-error EPub pass the filename to the adm-zip which can handle filename being a Buffer
  const epub = new EPub(buf, '', '');

  const promise = new Promise<void>((resolve, reject) => {
    epub.on('end', () => resolve());
    epub.on('error', () => reject("Error loading epub"));
  });
  
  epub.parse();

  await promise;

  for(let chapterIndex = 0; chapterIndex < epub.flow.length; ++chapterIndex) {

    const promise = new Promise<string>((resolve, reject) => {
      epub.getChapterRaw(epub.flow[chapterIndex].id, (error, text) => {
        if (error) {
          reject(error);
        } else {
          resolve(text);
        }
      })
    });

    yield await promise;
  }

  return '';
}


async function* getPdfText(content: string | ArrayBuffer ) : AsyncGenerator<string, string, string> {
  // @ts-expect-error pdfjsLib is added to window with the <script> tag
  const pdfjs = window.pdfjsLib as typeof import('pdfjs-dist/types/src/pdf');
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.min.mjs';

  const pdfDocument = await pdfjs.getDocument(content).promise

  for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
    const page = await pdfDocument.getPage(pageNum);
    const pageContent = await page.getTextContent();

    const fullPageContent = pageContent.items.map(contentItem => {
      if ('str' in contentItem) {
        return contentItem.str;
      }

      return '';
    }).join(' ');

    yield fullPageContent;
  }

  return '';
}