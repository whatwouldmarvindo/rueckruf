import { h } from "preact";

type DevkTextareaProps = {
  label: string;
  value: string[];
  onChange: (newValue: string[]) => void;
  required: boolean;
};

const insuranceProducts = ["Haftpflicht", "Hausrat", "KFZ", "Unfall", "Leben"];

export function DevkInsureProductSelect(
  { label, onChange, value: interests, required }: DevkTextareaProps,
) {
  const handleInterestChange = (
    e: h.JSX.TargetedEvent<HTMLInputElement, Event>,
  ) => {
    const { checked, value: newInterest } = e.currentTarget;

    let newInterests: string[];

    if (checked) {
      newInterests = [...interests, newInterest];
    } else {
      newInterests = interests.filter((interest) => interest !== newInterest);
    }

    onChange(newInterests);
  };

  return (
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2">
        {label}
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
                required={required && interests.length <= 0}
              />
              <span class="ml-2">{insuranceProduct}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
