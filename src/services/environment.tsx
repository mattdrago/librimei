import path from 'path';

const libraryFolder = process.env.LIBRARY_FOLDER ?? 'elibrary';
export const LIBRARY_PATH = path.isAbsolute(libraryFolder) ? libraryFolder : path.join(process.cwd(), libraryFolder)

export const LIBRARY_DB = path.join(LIBRARY_PATH, "library.json");