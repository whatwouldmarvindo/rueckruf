import { h } from "preact";
import { useState } from "preact/hooks";
import { DevkRadio } from "./DevkRadio.tsx";
import { DevkInput } from "./DevkInput.tsx";
import { DevkTextArea } from "./DevkTextArea.tsx";
import { DevkInsureProductSelect } from "./DevkInsuranceProductSelect.tsx";

interface RueckrufFormData {
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

export default function RueckrufForm() {
  const [isCustomer, setIsCustomer] = useState(false);
  const [formData, setFormData] = useState<RueckrufFormData>({
    interests: [] as string[],
    toC: false,
  });
  const [sentForm, setSentForm] = useState(true);

  const handleSubmit = async (
    e: h.JSX.TargetedEvent<HTMLElement, SubmitEvent>,
  ) => {
    e.preventDefault();
    await fetch("/api/rueckruf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setSentForm(true);
    resetForm();
  };

  const resetForm = () => {
    setFormData({ interests: [], toC: false });
  };

  return (
    <div class="bg-gray-100 min-h-screen flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 class="text-2xl font-bold mb-6 text-gray-800">Kontaktanfrage</h2>
        <form onSubmit={handleSubmit}>
          <DevkRadio
            label="Sind Sie bereits Kunde der DEVK?"
            value={isCustomer}
            onChange={setIsCustomer}
            formFieldName="isCustomer"
          />

          {isCustomer && (
            <DevkInput
              label="Wie ist ihre Kundennummer?"
              name="customerNumber"
              type="number"
              onChange={(newValue: number | string) =>
                setFormData({
                  ...formData,
                  customerNumber: newValue as number,
                })}
              required
            />
          )}

          {!isCustomer && (
            <>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <DevkInput
                  label="Vorname"
                  name="firstName"
                  onChange={(newValue) =>
                    setFormData({
                      ...formData,
                      firstName: newValue as string,
                    })}
                  placeholder="Max"
                  required
                />

                <DevkInput
                  label="Nachname"
                  name="lastName"
                  type="text"
                  onChange={(newValue) =>
                    setFormData({
                      ...formData,
                      lastName: newValue as string,
                    })}
                  placeholder="Mustermann"
                  required
                />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <DevkInput
                  label="PLZ"
                  name="zipCode"
                  type="number"
                  onChange={(newValue) =>
                    setFormData({ ...formData, zipCode: newValue as number })}
                  placeholder="50667"
                  required
                />

                <DevkInput
                  label="Wohnort"
                  name="city"
                  type="text"
                  onChange={(newValue) =>
                    setFormData({ ...formData, city: newValue as string })}
                  placeholder="Köln"
                  required
                />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <DevkInput
                  label="Beruf"
                  name="profession"
                  type="text"
                  onChange={(newValue) =>
                    setFormData({
                      ...formData,
                      profession: newValue as string,
                    })}
                  placeholder="Ihr Beruf"
                  required
                />

                <DevkInput
                  label="Arbeitgeber"
                  name="employer"
                  type="text"
                  onChange={(newValue) =>
                    setFormData({ ...formData, employer: newValue as string })}
                  placeholder="Ihr Arbeitgeber"
                />
              </div>

              <DevkInput
                label="E-Mail-Adresse"
                name="email"
                type="email"
                onChange={(newValue) =>
                  setFormData({ ...formData, email: newValue as string })}
                placeholder="ihre.email@beispiel.de"
                required
              />
            </>
          )}

          <DevkInput
            label="Wann sollen wir Sie kontaktieren?"
            name="contactTime"
            type="text"
            placeholder="z.B. Mittwoch Vormittags"
            onChange={(newValue) =>
              setFormData({ ...formData, contactTime: newValue as string })}
            required
          />

          <DevkTextArea
            label="Optionales Kommentarfeld"
            onChange={(newValue) =>
              setFormData({ ...formData, comment: newValue })}
            formFieldName="comment"
          />

          <DevkInsureProductSelect
            value={formData.interests}
            label="An welchen Versicherungssparten sind Sie interessiert?"
            onChange={(products: string[]) =>
              setFormData({ ...formData, interests: products })}
            required
          />

          <hr />

          <div class="mb-6 pt-2">
            <label htmlFor="Datenschutzhinweisen" class="cursor-pointer">
              <input
                id="Datenschutzhinweisen"
                name="ConfirmDatenschutz"
                type="checkbox"
                class="form-checkbox mr-2"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    toC: e.currentTarget.checked,
                  })}
                required
              />
              Ich habe die Datenschutzhinweise gelesen und akzeptiert.
            </label>
          </div>

          <div class="flex items-center justify-between">
            <button
              class="bg-brand-green hover:bg-brand-green-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Anfrage senden
            </button>
          </div>
        </form>
        {sentForm && (
          <p class="text-brand-green">
            Anfrage erfolgreich übermitteln! Wir melden uns bei ihnen
          </p>
        )}
      </div>
    </div>
  );
}
