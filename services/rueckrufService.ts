import { saveToFile } from "../repositories/fileRepository.ts";
import { Rueckruf } from "../types/rueckruf-schema.ts";

/**
 * Processes a callback request by generating an HTML document
 * and saving it to the filesystem.
 * @param payload The form data from the controller.
 * @returns The filename where the data was saved.
 */
export async function processRueckruf(
  payload: Rueckruf,
): Promise<string> {
  const htmlContent = generateHtml(payload);
  const filename = await saveToFile(htmlContent, "rueckruf");

  return filename;
}

/**
 * Helper function to generate HTML from the payload.
 * Kept private to this service module.
 */
function generateHtml(body: Rueckruf): string {
  return `
      <!DOCTYPE html>
      <html lang="de">
        <head><meta charset="UTF-8" /><title>Rückruf Anfrage</title></head>
        <body>
          <h1>Rückruf Anfrage</h1>
          <ul>
            <li><b>Kundennummer:</b> ${body.customerNumber ?? "N/A"}</li>
            <li><b>Nachname:</b> ${body.lastName ?? "N/A"}</li>
            <li><b>Vorname:</b> ${body.firstName ?? "N/A"}</li>
            <li><b>PLZ, Stadt:</b> ${body.zipCode ?? ""} ${body.city ?? ""}</li>
            <li><b>Beruf:</b> ${body.profession ?? "N/A"}</li>
            <li><b>Arbeitgeber:</b> ${body.employer ?? "N/A"}</li>
            <li><b>Email:</b> ${body.email ?? "N/A"}</li>
            <li><b>Gewünschte Kontaktzeit:</b> ${body.contactTime ?? "N/A"}</li>
            <li><b>Interessen:</b> ${body.interests?.join(", ") ?? "Keine"}</li>
            <li><b>Kommentar:</b> ${body.comment ?? "Kein Kommentar"}</li>
          </ul>
        </body>
      </html>
    `;
}
