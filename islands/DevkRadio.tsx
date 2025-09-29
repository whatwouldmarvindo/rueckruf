type DevkRadioProps = {
  label: string;
  value: boolean;
  onChange: (newValue: boolean) => void;
  formFieldName: string;
};

export function DevkRadio(
  { label, value, onChange, formFieldName }: DevkRadioProps,
) {
  return (
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <div>
        <label class="inline-flex items-center cursor-pointer">
          <input
            type="radio"
            name={formFieldName}
            checked={value === true}
            onChange={() => onChange(true)}
            class="form-radio"
          />
          <span class="ml-2">Ja</span>
        </label>
        <label class="inline-flex items-center ml-6 cursor-pointer">
          <input
            type="radio"
            name={formFieldName}
            checked={value === false}
            onChange={() => onChange(false)}
            class="form-radio"
          />
          <span class="ml-2">Nein</span>
        </label>
      </div>
    </div>
  );
}
