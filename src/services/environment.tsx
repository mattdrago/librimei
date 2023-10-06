const path = require('path');

const libraryFolder = process.env.LIBRARY_FOLDER;
export const LIBRARY_PATH = path.isAbsolute(libraryFolder) ? libraryFolder : path.join(process.cwd(), libraryFolder)

export const LIBRARY_DB = process.env.LIBRARY_DB as string;