import { useState } from "react";

export const useAuthForm = (initialState, validate) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }

    // Marcar como tocado após primeira interação
    if (!touched[name]) {
      setTouched((prev) => ({ ...prev, [name]: true }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Validar campo ao sair
    const error = validate(name, formData[name], formData);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (callback) => {
    setIsSubmitting(true);

    // Marcar todos campos como tocados
    const newTouched = {};
    Object.keys(formData).forEach((key) => {
      newTouched[key] = true;
    });
    setTouched(newTouched);

    // Validar todos os campos
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validate(key, formData[key], formData);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setIsSubmitting(false);
      return { success: false, errors: newErrors };
    }

    try {
      const result = await callback(formData);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFormData,
  };
};
