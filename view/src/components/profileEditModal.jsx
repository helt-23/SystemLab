import React, { useState, useRef } from 'react';
import { X, User, Mail, Lock, Camera } from 'lucide-react';
import { InputField } from './InputField';
import { useLabData } from '../context/LabDataContext';
import "../assets/styles/editModal.css";

const ProfileEditModal = () => {
  const { isProfileModalOpen, closeProfileModal } = useLabData();
  const [formData, setFormData] = useState({
    name: "Helton Pessoa",
    email: "helton@example.com",
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [profileImage, setProfileImage] = useState(null);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (formData.newPassword && formData.newPassword.length < 6) {
      newErrors.newPassword = 'Senha deve ter pelo menos 6 caracteres';
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Aqui você faria a chamada API para atualizar o perfil
      console.log('Dados atualizados:', { ...formData, profileImage });
      closeProfileModal();
    }
  };

  if (!isProfileModalOpen) return null;

  return (
    <div className="modal-overlay-edit" onClick={closeProfileModal}>
      <div className="modal-content-edit" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={closeProfileModal}>
          <X size={24} />
        </button>

        <h2 className="modal-title">Editar Perfil</h2>

        <div className="profile-image-container">
          <div className="profile-image-wrapper">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="profile-image"
              />
            ) : (
              <div className="profile-image-placeholder">
                <User size={48} />
              </div>
            )}
            <button
              className="change-image-btn"
              onClick={triggerFileInput}
            >
              <Camera size={18} />
            </button>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden-input"
          />
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          <InputField
            type="text"
            name="name"
            placeholder="Nome completo"
            value={formData.name}
            onChange={handleChange}
            icon={User}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}

          <InputField
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            icon={Mail}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}

          <div className="password-section">
            <h3 className="section-title">Alterar Senha</h3>

            <InputField
              type="password"
              name="currentPassword"
              placeholder="Senha atual"
              value={formData.currentPassword}
              onChange={handleChange}
              icon={Lock}
            />

            <InputField
              type="password"
              name="newPassword"
              placeholder="Nova senha"
              value={formData.newPassword}
              onChange={handleChange}
              icon={Lock}
            />
            {errors.newPassword && <p className="error-message">{errors.newPassword}</p>}

            <InputField
              type="password"
              name="confirmPassword"
              placeholder="Confirmar nova senha"
              value={formData.confirmPassword}
              onChange={handleChange}
              icon={Lock}
            />
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={closeProfileModal}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="save-btn"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;