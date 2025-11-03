import RegistrationCard from "./RegistrationCard";

export default function RegistrationsList({ registrations, onEdit, onDelete }) {

  const validRegistrations = registrations
    ? registrations.filter(entry => entry && entry.id && entry.fullName)
    : [];

  if (validRegistrations.length === 0) {
    return <p className="no-entries">No registrations submitted yet. Be the first!</p>;
  }

  return (
    <div className="list-wrapper">
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

