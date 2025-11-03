export default function RegistrationCard({ entry, onEdit, onDelete }) {
  if (!entry) {
    return null; // Don't render anything if the entry is bad
  }
  
  return (
    <div className="card">
      <div className="card-content">
        <h3>{entry.fullName || "No Name"}</h3>
        <p>{entry.email || "No Email"}</p>
        <p><strong>IIT:</strong> {entry.iitName || "N/A"} | <strong>Sport:</strong> {entry.sport || "N/A"}</p>
      </div>
      <div className="card-actions">
        <button onClick={() => onEdit(entry)} className="card-button-edit">
          Edit
        </button>
        <button
          onClick={() => onDelete(entry.id)} 
          className="card-button-delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
