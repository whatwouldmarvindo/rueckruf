import { define } from "../../utils.ts";
import { RueckrufPayload } from "../../types/rueckruf.ts";
import { processRueckruf } from "../../services/rueckrufService.ts";

export const handler = define.handlers<RueckrufPayload>({
  async POST(ctx) {
    try {
      const body: RueckrufPayload = await ctx.req.json();

      const filename = await processRueckruf(body);

      return new Response(
        JSON.stringify({
          message: "Request saved successfully",
          file: filename,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
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
