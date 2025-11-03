/**
 * A reusable Modal component.
 *
 * Props:
 * - title (string): The title to display in the modal header.
 * - children (ReactNode): The content to display in the modal body.
 * - onClose (function): Function to call when the modal should be closed.
 * - onSave (function): Function to call when the "Save" button is clicked.
 */
export default function Modal({ title, children, onClose, onSave }) {
  // We use `onSave` (which is the RegistrationForm's handleSubmit)
  // for the save button.
  const handleSaveClick = (e) => {
    // We pass the event 'e' so preventDefault works in the form
    onSave(e); 
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}
