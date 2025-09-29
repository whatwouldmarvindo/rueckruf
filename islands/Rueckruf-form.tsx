import { h } from "preact";
import { useState } from "preact/hooks";
import { DevkRadio } from "./DevkRadio.tsx";

interface RueckrufFormData {
  customerNumber?: number;
  firstName?: string;
  lastName?: string;
  zipCode?: number;
  city?: string;
  profession?: string;
  employer?: string;
  email?: string;
  contactTime?: Date;
  interests: string[];
  comment?: string;
}

const insuranceProducts = ["Haftpflicht", "Hausrat", "KFZ", "Unfall", "Leben"];
const weekDays = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"];

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

  const handleInputChange = (
    e: h.JSX.TargetedEvent<HTMLInputElement | HTMLTextAreaElement, Event>,
  ) => {
    const name = e.currentTarget.name as keyof RueckrufFormData;
    const value = e.currentTarget.value;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="customerNumber"
              >
                Wie ist Ihre Kundennummer?
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="customerNumber"
                type="text"
                placeholder="Ihre Kundennummer"
                name="customerNumber"
                value={formData.customerNumber}
                onChange={handleInputChange}
              />
            </div>
          )}

          {!isCustomer && (
            <>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="firstName"
                  >
                    Vorname
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="firstName"
                    type="text"
                    placeholder="Max"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="lastName"
                  >
                    Nachname
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="lastName"
                    type="text"
                    placeholder="Mustermann"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="zipCode"
                  >
                    PLZ
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="zipCode"
                    type="text"
                    placeholder="50667"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="city"
                  >
                    Wohnort
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="city"
                    type="text"
                    placeholder="Köln"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="profession"
                  >
                    Beruf
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="profession"
                    type="text"
                    placeholder="Ihr Beruf"
                    name="profession"
                    value={formData.profession}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="employer"
                  >
                    Arbeitgeber
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="employer"
                    type="text"
                    placeholder="Ihr Arbeitgeber"
                    name="employer"
                    value={formData.employer}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="email"
                >
                  E-Mail-Adresse
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="ihre.email@beispiel.de"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </>
          )}

          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="contactTime"
            >
              Wann sollen wir Sie kontaktieren?
            </label>

            <div className="flex flex-row align-middle justify-around">
              {weekDays.map((day) => (
                <div>
                  <p>{day}</p>
                  {["Vormittags", "Nachmittags"].map((time) => (
                    <div>
                      <label class="cursor-pointer inline-flex items-center">
                        <input
                          type="checkbox"
                          value={day + time}
                          onChange={handleInterestChange}
                          class="form-checkbox"
                        />
                        <span class="ml-2">{time}</span>
                      </label>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

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

          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="comment"
            >
              Optionales Kommentarfeld
            </label>
            <textarea
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="comment"
              placeholder="Ihre Nachricht an uns"
              name="comment"
              rows={4}
              value={formData.comment}
              onChange={handleInputChange}
            >
            </textarea>
          </div>

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
