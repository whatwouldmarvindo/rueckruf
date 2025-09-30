import { define } from "../../utils.ts";
import { processRueckruf } from "../../services/rueckrufService.ts";
import { Rueckruf, rueckrufSchema } from "../../types/rueckruf-schema.ts";

export const handler = define.handlers<Rueckruf>({
  async POST(ctx) {
    try {
      const body: unknown = await ctx.req.json();
      const rueckrufData = rueckrufSchema.parse(body);

      const filename = await processRueckruf(rueckrufData);

      return new Response(
        JSON.stringify({
          message: "Request saved successfully",
          file: filename,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
      // deno-lint-ignore no-explicit-any
    } catch (error: any) {
      // Handle any errors from parsing, validation, or file writing
      console.error("API Error in POST /api/rueckruf:", error.message);

      // Send a generic server error response
      return new Response(
        JSON.stringify({ message: "An error occurred", error: error.message }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  },
});
