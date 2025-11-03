import RegistrationCard from "./RegistrationCard";

export default function RegistrationsList({ registrations, onEdit, onDelete }) {
  
  // --- THIS IS THE BULLETPROOF FIX ---
  // Even though our service filters, we double-check here.
  // 1. We check if 'registrations' exists.
  // 2. We filter out any entries that are missing an 'id' or 'fullName'.
  const validRegistrations = registrations
    ? registrations.filter(entry => entry && entry.id && entry.fullName)
    : [];
  // ---------------------------------

  if (validRegistrations.length === 0) {
    return <p className="no-entries">No registrations submitted yet. Be the first!</p>;
  }

  return (
    <div className="list-wrapper">
      {/* We map over the CLEANED array, not the original one */}
      {validRegistrations.map((entry) => (
        <RegistrationCard
          key={entry.id}
          entry={entry}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

