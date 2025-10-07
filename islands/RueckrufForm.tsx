import { DevkRadio } from "./DevkRadio.tsx";
import { DevkInput } from "./DevkInput.tsx";
import { DevkTextArea } from "./DevkTextArea.tsx";
import { DevkInsureProductSelect } from "./DevkInsuranceProductSelect.tsx";
import { useRueckrufForm } from "../hooks/useRueckrufForm.ts";

export default function RueckrufForm() {
  const {
    formData,
    isCustomer,
    isFormSent,
    setIsCustomer,
    handleFieldChange,
    handleSubmit,
  } = useRueckrufForm();

  return (
    <div class="bg-gray-100 min-h-screen flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 class="text-2xl font-bold mb-6 text-gray-800">Kontaktanfrage</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
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
              onChange={(newValue) =>
                handleFieldChange("customerNumber", newValue)}
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
                    handleFieldChange("firstName", newValue)}
                  placeholder="Max"
                  required
                />
                <DevkInput
                  label="Nachname"
                  name="lastName"
                  type="text"
                  onChange={(newValue) =>
                    handleFieldChange("lastName", newValue)}
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
                    handleFieldChange("zipCode", newValue)}
                  placeholder="50667"
                  required
                />
                <DevkInput
                  label="Wohnort"
                  name="city"
                  type="text"
                  onChange={(newValue) => handleFieldChange("city", newValue)}
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
                    handleFieldChange("profession", newValue)}
                  placeholder="Ihr Beruf"
                  required
                />
                <DevkInput
                  label="Arbeitgeber"
                  name="employer"
                  type="text"
                  onChange={(newValue) =>
                    handleFieldChange("employer", newValue)}
                  placeholder="Ihr Arbeitgeber"
                  required
                />
              </div>

              <DevkInput
                label="E-Mail-Adresse"
                name="email"
                type="email"
                onChange={(newValue) => handleFieldChange("email", newValue)}
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
            onChange={(newValue) => handleFieldChange("contactTime", newValue)}
            required
          />

          <DevkTextArea
            label="Optionales Kommentarfeld"
            onChange={(newValue) => handleFieldChange("comment", newValue)}
            formFieldName="comment"
          />

          <DevkInsureProductSelect
            value={formData.interests}
            label="An welchen Versicherungssparten sind Sie interessiert?"
            onChange={(products) => handleFieldChange("interests", products)}
            required
          />

          <hr class="my-4" />

          <div class="mb-6">
            <label htmlFor="Datenschutzhinweisen" class="cursor-pointer">
              <input
                id="Datenschutzhinweisen"
                name="ConfirmDatenschutz"
                type="checkbox"
                class="form-checkbox mr-2"
                onChange={(e) =>
                  handleFieldChange("toC", e.currentTarget.checked)}
                required
              />
              Ich habe die Datenschutzhinweise gelesen und akzeptiert.
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
        {isFormSent && (
          <p class="text-green-600 mt-4">
            Anfrage erfolgreich übermittelt! Wir melden uns bei Ihnen.
          </p>
        )}
      </div>
    </div>
  );
}
