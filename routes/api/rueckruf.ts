import { define } from "../../utils.ts";
import { app } from "../../main.ts";
import { RouteHandler } from "fresh";

// Optional: Definieren Sie einen Typ für die erwarteten Daten im Body
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
    console.log(body);
    return new Response("200");
  },
});
