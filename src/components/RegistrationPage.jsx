import { useState, useEffect } from 'react';
import { db, auth, signIn } from '../firebaseConfig';
import RegistrationService from '../services/RegistrationService';
import Navbar from './Navbar';
import RegistrationForm from './RegistrationForm';
import RegistrationsList from './RegistrationsList';
import Modal from './Modal';

const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-iism-app';

export default function RegistrationPage({ onNavigateHome }) {
  const [registrations, setRegistrations] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);
  const [service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const userId = await signIn();
        if (!userId) {
          throw new Error("Firebase sign-in failed. Check Anonymous Auth in your Firebase console.");
        }
        if (!db || !auth) {
           throw new Error("Firebase database or auth is not initialized.");
        }
        const registrationService = new RegistrationService(db, userId, appId);
        setService(registrationService);
      } catch (err) {
        console.error("Initialization error:", err);
        setError(err.message);
        setIsLoading(false);
      }
    };
    initializeApp();
  }, []); 

  useEffect(() => {
    if (service) {
      const unsubscribe = service.listenForChanges(
        (newRegistrations) => {
          setRegistrations(newRegistrations);
          setIsLoading(false);
        }
      );
      return () => unsubscribe();
    }
  }, [service]);

  const handleRegister = async (formData) => {
    if (!service) return;
    try {
      await service.addRegistration(formData);
    } catch (err) {
      console.error("Failed to register:", err);
    }
  };

  const handleEditClick = (entry) => {
    setEditingEntry(entry);
  };

  const handleUpdate = async (formData) => {
    if (!service) return;
    try {
      if (formData.id) {
        await service.deleteRegistration(formData.id);
      }
      await service.addRegistration(formData); 
      setEditingEntry(null);
    } catch (err) {
      console.error("Failed to update:", err);
    }
  };

  const handleDelete = async (registrationId) => {
    if (!service) return;
    if (!registrationId) {
      console.error("No ID provided for deletion");
      return;
    }
    try {
      await service.deleteRegistration(registrationId);
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  if (error) {
    return (
      <div className="container error-message">
        <h2>Something went wrong:</h2>
        <pre>{error}</pre>
        <p>This is likely a permission error. Have you enabled "Anonymous Authentication" in your Firebase Console?</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container loading-message">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <>
      <Navbar onNavigateHome={onNavigateHome} />
      
      <div className="container">
        <main className="main-content">
          <div className="form-container">
            <h1>Register for IISM 2025</h1>
            <p>Fill out the form below to register for the meet.</p>
            <RegistrationForm
              isEditMode={false}
              onSubmit={handleRegister}
            />
          </div>
          <div className="list-container">
            <h2>Current Registrations</h2>
            <RegistrationsList
              registrations={registrations}
              onEdit={handleEditClick}
              onDelete={handleDelete}
            />
          </div>
        </main>
      </div>

      {editingEntry && (
        <Modal onClose={() => setEditingEntry(null)} showCloseButton={false}>
          <RegistrationForm
            isEditMode={true}
            currentEntry={editingEntry}
            onSubmit={handleUpdate}
            onCancel={() => setEditingEntry(null)}
          />
        </Modal>
      )}
    </>
  );
}

