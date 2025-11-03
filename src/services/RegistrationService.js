import {
  ref,
  push,
  set,
  remove,
  onValue,
  query,
  orderByChild
} from 'firebase/database';

class RegistrationService {
  constructor(db, userId, appId) {
    if (!db) {
      throw new Error("Database (db) instance is required");
    }
    if (!userId) {
      throw new Error("User ID (userId) is required");
    }
    if (!appId) {
      throw new Error("App ID (appId) is required");
    }

    this.db = db;
    this.userId = userId;
    this.appId = appId;
    
    this.collectionPath = `artifacts/${this.appId}/public/data/iism2025_registrations`;
    this.collectionRef = ref(this.db, this.collectionPath);
  }

  async addRegistration(formData) {
    try {
      const cleanData = {
        fullName: formData.fullName || "",
        email: formData.email || "",
        iitName: formData.iitName || "Other",
        sport: formData.sport || "Athletics",
        gender: formData.gender || "Other",
      };
      
      const newDocRef = push(this.collectionRef);
      
      const docData = {
        ...cleanData,
        id: newDocRef.key,
        createdBy: this.userId,
        createdAt: new Date().toISOString()
      };
      
      await set(newDocRef, docData);
    } catch (error) {
      console.error("Error adding document: ", error);
      throw new Error("Failed to add registration.");
    }
  }

  async updateRegistration(updatedEntry) {
    try {
      if (!updatedEntry || !updatedEntry.id) {
        throw new Error("Invalid entry data for update.");
      }
      
      const docRef = ref(this.db, `${this.collectionPath}/${updatedEntry.id}`);
      
      const dataToUpdate = {
        ...updatedEntry,
        updatedAt: new Date().toISOString()
      };
      
      await set(docRef, dataToUpdate);
    } catch (error) {
      console.error("Error updating document: ", error);
      throw new Error("Failed to update registration.");
    }
  }

  async deleteRegistration(registrationId) {
    try {
      if (!registrationId || typeof registrationId !== 'string') {
        throw new Error(`Invalid registrationId: ${registrationId}`);
      }
      const docRef = ref(this.db, `${this.collectionPath}/${registrationId}`);
      await remove(docRef);
    } catch (error) {
      console.error("Error deleting document: ", error);
      throw new Error("Failed to delete registration.");
    }
  }

  listenForChanges(onUpdate) {
    const q = query(this.collectionRef, orderByChild('createdAt'));
    
    const unsubscribe = onValue(
      q,
      (snapshot) => {
        let newRegistrations = [];
        
        snapshot.forEach((childSnapshot) => {
          const entry = childSnapshot.val();
          if (entry && entry.id) {
            newRegistrations.push(entry);
          }
        });
        
        newRegistrations.reverse(); 
        
        onUpdate(newRegistrations);
      },
      (error) => {
        console.error("Error fetching registrations:", error);
        onUpdate([]);
        throw new Error("Failed to listen for registration changes.");
      }
    );
    
    return unsubscribe;
  }
}

export default RegistrationService;
