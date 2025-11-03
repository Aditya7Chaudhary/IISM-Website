import { useState, useEffect } from "react";

const initialFormData = {
  fullName: "",
  email: "",
  iitName: "Other",
  sport: "Athletics",
  gender: "Male",
};

export default function RegistrationForm({
  isEditMode = false,
  currentEntry = null,
  onSubmit,
  onCancel,
}) {
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (isEditMode && currentEntry) {
      setFormData(currentEntry);
    } else {
      setFormData(initialFormData);
    }
  }, [isEditMode, currentEntry]);

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

      {isEditMode && <h2>Edit Registration</h2>}

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

      {!isEditMode && (
        <div className="form-actions">
          <button type="submit" className="form-button-primary">
            Register
          </button>
        </div>
      )}

      {isEditMode && (
        <div className="form-actions">
          <button type="submit" className="form-button-primary">
            Save Changes
          </button>
          <button
            type="button"
            className="form-button-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      )}
    </form>
  );
}
