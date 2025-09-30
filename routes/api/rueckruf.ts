import { define } from "../../utils.ts";

interface RueckrufPayload {
  customerNumber?: number;
  firstName?: string;
  lastName?: string;
  zipCode?: number;
  city?: string;
  profession?: string;
  employer?: string;
  email?: string;
  contactTime?: string;
  interests: string[];
  comment?: string;
  toC: boolean;
}

export const handler = define.handlers<RueckrufPayload>({
  async POST(ctx) {
    const body: RueckrufPayload = await ctx.req.json();

    console.log("Received: ", body);

    // Convert body to a simple HTML document
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="de">
        <head>
          <meta charset="UTF-8" />
          <title>Rückruf Anfrage</title>
        </head>
        <body>
          <h1>Rückruf Anfrage</h1>
          <ul>
            <li><b>Kundennummer:</b> ${body.customerNumber ?? ""}</li>
            <li><b>Nachname:</b> ${body.lastName ?? ""}</li>
            <li><b>Vorname:</b> ${body.firstName ?? ""}</li>
            <li><b>PLZ, Stadt:</b> ${body.zipCode ?? ""} ${body.city ?? ""}</li>
            <li><b>Beruf:</b> ${body.profession ?? ""}</li>
            <li><b>Arbeitgeber:</b> ${body.employer ?? ""}</li>
            <li><b>Email:</b> ${body.email ?? ""}</li>
            <li><b>Gewünschte Kontaktzeit:</b> ${body.contactTime ?? ""}</li>
            <li><b>Interessante Versicherungssparten:</b> ${
      body.interests?.join(", ") ?? ""
    }</li>
            <li><b>Kommentar:</b> ${body.comment ?? ""}</li>
          </ul>
        </body>
      </html>
    `;

    const filePath = "./data";
    const timeStamp = new Date().toISOString();
    const filename = `${filePath}/rueckruf-${timeStamp}.html`;
    try {
      await Deno.mkdir(filePath);
    } catch (error) {
      null;
    }
    await Deno.writeTextFile(filename, htmlContent);

    return new Response(
      JSON.stringify({ message: "Saved as HTML", file: filename }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  },
});
