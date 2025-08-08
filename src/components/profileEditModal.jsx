import React from 'react';
import { X, User, Mail, Lock, Camera } from 'lucide-react';
import { InputField } from './inputField';
import { useLabData } from '../context/LabDataContext';
import { useProfileEdit } from '../customHooks/useProfileEdit';
import "../assets/styles/editModal.css";

const ProfileEditModal = () => {
  const { isProfileModalOpen, closeProfileModal, userProfile } = useLabData();
  const {
    formData,
    profileImage,
    errors,
    fileInputRef,
    handleChange,
    handleImageChange,
    triggerFileInput,
    handleSubmit
  } = useProfileEdit(userProfile);

  if (!isProfileModalOpen) return null;

  return (
    <div className="modal-overlay-edit" onClick={closeProfileModal}>
      <div className="modal-content-edit" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={closeProfileModal}>
          <X size={24} />
        </button>

        <h1 className="modal-title">Editar Perfil</h1>

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

        <form onSubmit={(e) => handleSubmit(e, closeProfileModal)} className="profile-form">
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