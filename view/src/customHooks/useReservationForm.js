import { useState } from "react";

const useReservationForm = () => {
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [reservationType, setReservationType] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  const reservationTypes = [
    { value: "aula", label: "Aula" },
    { value: "manutencao", label: "Manutenção" },
    { value: "instalacao", label: "Instalação de Software" },
    { value: "outro", label: "Outro" },
  ];

  const handleSlotChange = (slotTime) => {
    setSelectedSlots((prev) => {
      if (prev.includes(slotTime)) {
        return prev.filter((time) => time !== slotTime);
      } else {
        return [...prev, slotTime];
      }
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setErrors((prev) => ({ ...prev, file: null }));
    } else {
      setErrors((prev) => ({
        ...prev,
        file: "Por favor, selecione um arquivo PDF.",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (selectedSlots.length === 0) {
      newErrors.slots = "Selecione pelo menos um horário.";
    }

    if (!reservationType) {
      newErrors.reservationType = "Selecione o tipo de reserva.";
    }

    if (!description.trim()) {
      newErrors.description = "Insira uma descrição.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setSelectedSlots([]);
    setReservationType("");
    setDescription("");
    setFile(null);
    setErrors({});
  };

  return {
    selectedSlots,
    reservationType,
    description,
    file,
    errors,
    reservationTypes,
    handleSlotChange,
    handleFileChange,
    setReservationType,
    setDescription,
    validateForm,
    resetForm,
  };
};

export default useReservationForm;
