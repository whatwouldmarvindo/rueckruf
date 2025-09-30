import { z } from "@zod/zod";

export const rueckrufSchema = z.object({
  customerNumber: z.number().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  zipCode: z.number().optional(),
  city: z.string().optional(),
  profession: z.string().optional(),
  employer: z.string().optional(),
  email: z.string().email({
    message: "Bitte geben Sie eine gültige E-Mail-Adresse an.",
  }).optional(),

  // These fields have consistent validation rules.
  contactTime: z.string(),
  interests: z.array(z.string()).nonempty({
    message: "Bitte wählen Sie mindestens ein Interesse aus.",
  }),
  comment: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.customerNumber === undefined || data.customerNumber <= 0) {
    if (!data.firstName || data.firstName.trim() === "") {
      ctx.addIssue({
        code: "custom",
        path: ["firstName"],
        message:
          "Vorname ist ein Pflichtfeld, wenn keine Kundennummer angegeben ist.",
      });
    }
    if (!data.lastName || data.lastName.trim() === "") {
      ctx.addIssue({
        code: "custom",
        path: ["lastName"],
        message:
          "Nachname ist ein Pflichtfeld, wenn keine Kundennummer angegeben ist.",
      });
    }
    if (!data.email) {
      ctx.addIssue({
        code: "custom",
        path: ["email"],
        message:
          "E-Mail ist ein Pflichtfeld, wenn keine Kundennummer angegeben ist.",
      });
    }
  }
});

export type Rueckruf = z.infer<typeof rueckrufSchema>;
