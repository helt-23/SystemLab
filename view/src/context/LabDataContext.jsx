// src/context/LabDataContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import {
  getBlocos,
  getLaboratorios,
  getSchedules,
  getUserBookings
} from '../services/labService';

const LabDataContext = createContext();

export const LabDataProvider = ({ children }) => {
  const [blocos, setBlocos] = useState([]);
  const [laboratorios, setLaboratorios] = useState({});
  const [schedules, setSchedules] = useState({});
  const [userBookings, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookingsModalOpen, setIsBookingsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      try {
        setLoading(true);
        setBlocos(getBlocos());
        setLaboratorios(getLaboratorios());
        setSchedules(getSchedules());
        setUserBookings(getUserBookings());
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openBookingsModal = () => setIsBookingsModalOpen(true);
  const closeBookingsModal = () => setIsBookingsModalOpen(false);
  const openProfileModal = () => setIsProfileModalOpen(true);
  const closeProfileModal = () => setIsProfileModalOpen(false);

  const getLabDetails = (labId) => laboratorios[labId] || null;
  const getLabSchedule = (labId) => schedules[labId] || null;

  const addUserBooking = (newBooking) => {
    const newId = userBookings.length > 0
      ? Math.max(...userBookings.map(b => b.id)) + 1
      : 1;
    const bookingToAdd = { ...newBooking, id: newId };
    setUserBookings(prev => [...prev, bookingToAdd]);
    return bookingToAdd;
  };

  const removeUserBooking = (bookingId) => {
    setUserBookings(prev => prev.filter(b => b.id !== bookingId));
  };

  return (
    <LabDataContext.Provider value={{
      blocos,
      laboratorios,
      schedules,
      loading,
      error,
      userBookings,
      isBookingsModalOpen,
      isProfileModalOpen,
      openBookingsModal,
      closeBookingsModal,
      openProfileModal,
      closeProfileModal,
      getLabDetails,
      getLabSchedule,
      addUserBooking,
      removeUserBooking
    }}>
      {children}
    </LabDataContext.Provider>
  );
};

export const useLabData = () => {
  const context = useContext(LabDataContext);
  if (context === undefined) {
    throw new Error('useLabData must be used within a LabDataProvider');
  }
  return context;
};