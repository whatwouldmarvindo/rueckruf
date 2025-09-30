const FILE_PATH = "./data";

/**
 * Saves content to a file with a timestamp in the ./data directory.
 * Ensures the directory exists before writing.
 * @param content The string content to save.
 * @param baseName The base name for the file (e.g., "rueckruf").
 * @returns The full path of the created file.
 */
export async function saveToFile(
  content: string,
  baseName: string,
): Promise<string> {
  try {
    // Ensure the directory exists, creating it if necessary.
    // { recursive: true } prevents an error if the directory already exists.
    await Deno.mkdir(FILE_PATH, { recursive: true });

    const timeStamp = new Date().toISOString();
    const filename = `${FILE_PATH}/${baseName}-${timeStamp}.html`;

    await Deno.writeTextFile(filename, content);
    console.log(`File successfully saved: ${filename}`);

    return filename;
  } catch (error) {
    console.error("Error in fileRepository: Failed to write file.", error);
    // Re-throw the error so the service layer can handle it.
    throw new Error("Could not save the data file.");
  }
}
