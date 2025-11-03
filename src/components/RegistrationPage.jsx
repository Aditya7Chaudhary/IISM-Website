import { useState, useEffect } from 'react';
import { db, auth, signIn } from '../firebaseConfig';
import RegistrationService from '../services/RegistrationService';
import Navbar from './Navbar';
import RegistrationForm from './RegistrationForm';
import RegistrationsList from './RegistrationsList';
import Modal from './Modal';
// Note: We don't import App.css here, App.jsx does it.

// This is the fallback app ID
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-iism-app';

// This component receives a prop `onNavigateHome` from App.jsx
export default function RegistrationPage({ onNavigateHome }) {
  const [registrations, setRegistrations] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);
  const [service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- This effect runs ONCE on load to sign in and set up the service ---
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
  }, []); // The empty array [] means this runs only once

  // --- This effect runs AFTER the 'service' is created ---
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
  }, [service]); // This effect re-runs if 'service' changes

  // --- Handler Functions ---
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
      // Use the "Delete and Re-create" logic
      if (formData.id) {
        // We pass the full formData, but also need the ID for deletion
        await service.deleteRegistration(formData.id);
      }
      // addRegistration will create a new entry with a new ID
      await service.addRegistration(formData); 
      setEditingEntry(null); // Close the modal
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

  // --- Render Logic ---
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

  // If we are done loading and have no errors, show the app
  return (
    <>
      {/* We pass the 'onNavigateHome' prop to the Navbar */}
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

      {/* The Edit Modal (This includes the fix for the 'x' button) */}
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

