import { useState, useEffect } from "react";

const initialFormData = {
  fullName: "",
  email: "",
  iitName: "Other",
  sport: "Athletics",
  gender: "Male",
};

export default function RegistrationForm({
  // --- 1. THE "EDIT" SWITCH ---
  // This prop 'isEditMode' is passed from App.jsx.
  // It's 'false' for the main form, but 'true' when the modal opens.
  isEditMode = false,
  currentEntry = null,
  onSubmit,
  onCancel,
}) {
  const [formData, setFormData] = useState(initialFormData);

  // --- 2. THE "PRE-FILLER" (FOR EDITING) ---
  // This 'useEffect' hook runs when the component loads.
  // If 'isEditMode' is true, it pre-fills the form with the 'currentEntry' data.
  // If not, it just shows a blank form.
  useEffect(() => {
    if (isEditMode && currentEntry) {
      // We are in "Edit Mode," so fill the form
      setFormData(currentEntry);
    } else {
      // We are in "Register Mode," so show a blank form
      setFormData(initialFormData);
    }
  }, [isEditMode, currentEntry]); // Re-run if these props change

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) {
      console.error("Validation Failed: Full Name and Email are required.");
      return;
    }
    onSubmit(formData);
    
    if (!isEditMode) {
      setFormData(initialFormData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      
      {/* --- 3. THE "EDIT" TITLE --- */}
      {/* This line only shows the <h2> title if 'isEditMode' is true. */}
      {isEditMode && <h2>Edit Registration</h2>}

      {/* ... all the form fields (fullName, email, etc.) are here ... */}
      {/* (These are the same for both modes) */}

      <div className="form-group">
        <label htmlFor="fullName">Full Name</label>
        <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required className="form-input" />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="form-input" />
      </div>
      <div className="form-group">
        <label htmlFor="iitName">IIT Name</label>
        <select id="iitName" name="iitName" value={formData.iitName} onChange={handleChange} className="form-input">
          <option value="IITM">IIT Madras</option>
          <option value="IITB">IIT Bombay</option>
          <option value="IITD">IIT Delhi</option>
          <option value="IITK">IIT Kanpur</option>
          <option value="IITKGP">IIT Kharagpur</option>
          <option value="IITR">IIT Roorkee</option>
          <option value="IITG">IIT Guwahati</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="sport">Sport</label>
        <select id="sport" name="sport" value={formData.sport} onChange={handleChange} className="form-input">
          <option value="Athletics">Athletics</option>
          <option value="Badminton">Badminton</option>
          <option value="Basketball">Basketball</option>
          <option value="Cricket">Cricket</option>
          <option value="Football">Football</option>
          <option value="Hockey">Hockey</option>
          <option value="Swimming">Swimming</option>
          <option value="Tennis">Tennis</option>
          <option value="Volleyball">Volleyball</option>
        </select>
      </div>
      <div className="form-group">
        <label>Gender</label>
        <div className="radio-group">
          <label>
            <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} />
            Male
          </label>
          <label>
            <input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} />
            Female
          </label>
          <label>
            <input type="radio" name="gender" value="Other" checked={formData.gender === "Other"} onChange={handleChange} />
            Other
          </label>
        </div>
      </div>


      {/* --- 4. THE "EDIT" BUTTONS --- */}
      {/* This logic shows different buttons based on the 'isEditMode' switch. */}

      {/* If NOT in edit mode, show the "Register" button. */}
      {!isEditMode && (
        <div className="form-actions">
          <button type="submit" className="form-button-primary">
            Register
          </button>
        </div>
      )}

      {/* If we ARE in edit mode, show "Save Changes" and "Cancel" buttons. */}
      {isEditMode && (
        <div className="form-actions">
          <button type="submit" className="form-button-primary">
            Save Changes
          </button>
          <button
            type="button"
            className="form-button-secondary"
            onClick={onCancel} // 'onCancel' is passed from App.jsx
          >
            Cancel
          </button>
        </div>
      )}
    </form>
  );
}
