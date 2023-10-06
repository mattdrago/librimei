import { ReadableOptions } from "stream";

const path = require("path");
const fs = require("fs");

import { LIBRARY_PATH } from "@/services/environment";

export interface Streamer {
  data: ReadableStream<Uint8Array>;
  contentType: string;
  contentSize: string;
}

function createReadableStream(
  contentFileName: string
): ReadableStream<Uint8Array> {
  const downloadStream = fs.createReadStream(contentFileName);

  return new ReadableStream({
    start(controller) {
      downloadStream.on("data", (chunk: Buffer) =>
        controller.enqueue(new Uint8Array(chunk))
      );
      downloadStream.on("end", () => controller.close());
      downloadStream.on("error", (error: NodeJS.ErrnoException) =>
        controller.error(error)
      );
    },
    cancel() {
      downloadStream.destroy();
    },
  });
}

export async function streamFile(pathParts: string[]): Promise<Streamer> {
  const contentFileName = path.join(LIBRARY_PATH, ...pathParts);

  return {
    data: createReadableStream(contentFileName),
    contentType: path.extname(contentFileName).replace(".", ""),
    contentSize: (await fs.promises.stat(contentFileName)).size,
  };
}
