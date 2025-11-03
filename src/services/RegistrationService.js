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

  // CREATE
  async addRegistration(formData) {
    try {
      // Create a *clean* object, free of any React internal keys
      const cleanData = {
        fullName: formData.fullName || "",
        email: formData.email || "",
        iitName: formData.iitName || "Other",
        sport: formData.sport || "Athletics",
        gender: formData.gender || "Other",
      };
      
      const newDocRef = push(this.collectionRef); // Create a new unique key
      
      const docData = {
        ...cleanData,
        id: newDocRef.key, // Save the key as the ID
        createdBy: this.userId,
        createdAt: new Date().toISOString() // This is the timestamp we sort by
      };
      
      await set(newDocRef, docData);
    } catch (error) {
      console.error("Error adding document: ", error);
      throw new Error("Failed to add registration.");
    }
  }

  // UPDATE
  async updateRegistration(updatedEntry) {
    try {
      if (!updatedEntry || !updatedEntry.id) {
        throw new Error("Invalid entry data for update.");
      }
      
      const docRef = ref(this.db, `${this.collectionPath}/${updatedEntry.id}`);
      
      // Create a clean data object, preserving internal keys
      const dataToUpdate = {
        ...updatedEntry, // This now includes id, createdBy, createdAt
        updatedAt: new Date().toISOString()
      };
      
      await set(docRef, dataToUpdate);
    } catch (error) {
      console.error("Error updating document: ", error);
      throw new Error("Failed to update registration.");
    }
  }

  // DELETE
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

  // READ (Real-time Listener)
  listenForChanges(onUpdate) {
    // 1. We ask Firebase to sort the data by our 'createdAt' timestamp.
    // This will give us a list from OLDEST to NEWEST.
    const q = query(this.collectionRef, orderByChild('createdAt'));
    
    const unsubscribe = onValue(
      q,
      (snapshot) => {
        // --- THIS IS THE FIX ---
        // We create an empty array to hold our sorted data.
        let newRegistrations = [];
        
        // 2. We use snapshot.forEach() which loops in the correct order.
        // This is the ONLY reliable way to preserve Firebase sort order.
        snapshot.forEach((childSnapshot) => {
          const entry = childSnapshot.val();
          if (entry && entry.id) {
            newRegistrations.push(entry);
          }
        });
        
        // 3. At this point, newRegistrations = [oldest, middle, newest]
        // NOW we reverse it to get the "stack" order (newest first).
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

// Don't forget this line!
export default RegistrationService;
