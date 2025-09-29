import { h } from "preact";
import { useState } from "preact/hooks";
import { DevkRadio } from "./DevkRadio.tsx";
import { DevkInput } from "./DevkInput.tsx";
import { DevkTextArea } from "./DevkTextArea.tsx";

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
}

const insuranceProducts = ["Haftpflicht", "Hausrat", "KFZ", "Unfall", "Leben"];

export default function DevkForm() {
  const [isCustomer, setIsCustomer] = useState(false);
  const [formData, setFormData] = useState<RueckrufFormData>({
    interests: [] as string[],
  });
  const [acceptDatenschutz, setAcceptDatenschutz] = useState(false);

  const handleInterestChange = (
    e: h.JSX.TargetedEvent<HTMLInputElement, Event>,
  ) => {
    const { value, checked } = e.currentTarget;
    if (checked) {
      setFormData({ ...formData, interests: [...formData.interests, value] });
    } else {
      setFormData({
        ...formData,
        interests: formData.interests.filter((interest) => interest !== value),
      });
    }
  };

  const handleSubmit = (e: h.JSX.TargetedEvent<HTMLElement, Event>) => {
    e.preventDefault();
    console.log(formData);
    alert("Formulardaten wurden in der Konsole protokolliert.");
  };

  return (
    <div class="bg-gray-100 min-h-screen flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <p>{JSON.stringify(formData)}</p>
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
              label="Wie ist ihre Kundennummer"
              name="customerNumber"
              type="number"
              onChange={(newValue: number | string) =>
                setFormData({
                  ...formData,
                  customerNumber: newValue as number,
                })}
            />
          )}

          {!isCustomer && (
            <>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <DevkInput
                  label="Vorname"
                  name="firstName"
                  onChange={(newValue) =>
                    setFormData({ ...formData, firstName: newValue as string })}
                  placeholder="Max"
                />

                <DevkInput
                  label="Nachname"
                  name="lastName"
                  type="text"
                  onChange={(newValue) =>
                    setFormData({ ...formData, lastName: newValue as string })}
                  placeholder="Mustermann"
                />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <DevkInput
                  label="PLZ"
                  name="zipCode"
                  type="number"
                  onChange={(newValue: number) =>
                    setFormData({ ...formData, zipCode: newValue })}
                  placeholder="50667"
                />

                <DevkInput
                  label="Wohnort"
                  name="city"
                  type="text"
                  onChange={(newValue: string) =>
                    setFormData({ ...formData, city: newValue })}
                  placeholder="Köln"
                />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <DevkInput
                  label="Beruf"
                  name="profession"
                  type="text"
                  onChange={(newValue: string) =>
                    setFormData({
                      ...formData,
                      profession: newValue,
                    })}
                  placeholder="Ihr Beruf"
                />

                <DevkInput
                  label="Arbeitgeber"
                  name="employer"
                  type="text"
                  onChange={(newValue: string) =>
                    setFormData({ ...formData, employer: newValue })}
                  placeholder="Ihr Arbeitgeber"
                />
              </div>

              <DevkInput
                label="E-Mail-Adresse"
                name="email"
                type="email"
                onChange={(newValue: string) =>
                  setFormData({ ...formData, email: newValue })}
                placeholder="ihre.email@beispiel.de"
              />
            </>
          )}

          <DevkInput
            label="Wann sollen wir Sie kontaktieren?"
            name="contactTime"
            type="text"
            onChange={(newValue: string) =>
              setFormData({ ...formData, contactTime: newValue })}
          />

          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2">
              An welchen Versicherungssparten sind Sie interessiert?
            </label>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
              {insuranceProducts.map((insuranceProduct) => (
                <div key={insuranceProduct}>
                  <label class="cursor-pointer inline-flex items-center">
                    <input
                      type="checkbox"
                      value={insuranceProduct}
                      onChange={handleInterestChange}
                      class="form-checkbox"
                    />
                    <span class="ml-2">{insuranceProduct}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <DevkTextArea
            label="Optionales Kommentarfeld"
            onChange={(newValue) =>
              setFormData({ ...formData, comment: newValue })}
            formFieldName="comment"
          />

          <div class="mb-6">
            <label htmlFor="Datenschutzhinweisen" class="cursor-pointer">
              <input
                id="Datenschutzhinweisen"
                name="ConfirmDatenschutz"
                type="checkbox"
                class="form-checkbox mr-2"
                onChange={(e) => setAcceptDatenschutz(e.currentTarget.checked)}
              />
              Ich habe die Datenschutzhinweisen gelesen und akzeptiert
            </label>
          </div>

          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Anfrage senden
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
