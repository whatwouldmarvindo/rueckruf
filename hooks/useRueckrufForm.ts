import { useState } from "preact/hooks";
import { RueckrufFormData } from "../types/rueckruf.ts";
import { h } from "preact";

export function useRueckrufForm() {
  const [formData, setFormData] = useState<RueckrufFormData>({
    interests: [],
    toC: false,
  });

  const [isCustomer, setIsCustomer] = useState(false);

  const [isFormSent, setIsFormSent] = useState(false);

  const handleFieldChange = (
    field: keyof RueckrufFormData,
    value: RueckrufFormData[keyof RueckrufFormData],
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setFormData({ interests: [], toC: false });
    setIsCustomer(false);
  };

  const handleSubmit = async (
    e: h.JSX.TargetedEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/rueckruf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Fehler bei der Server-Anfrage");
      }

      setIsFormSent(true);
      resetForm();

      setTimeout(() => setIsFormSent(false), 5000);
    } catch (error) {
      console.error("Senden fehlgeschlagen:", error);
    }
  };

  return {
    formData,
    isCustomer,
    isFormSent,
    setIsCustomer,
    handleFieldChange,
    handleSubmit,
  };
}
