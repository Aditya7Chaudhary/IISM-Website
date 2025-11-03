# Core Strategy:

•	Framework: React.js (using Vite)
•	Database: Firebase Real-time Database
•	Authentication: Firebase Anonymous Authentication
•	Deployment: Firebase Hosting
•	Styling: Custom CSS (no frameworks like Tailwind or Bootstrap)

# Part 1: What The Website Can Do (Features)

•	The site functions as a two-page application.
•	Users can navigate between the "Home" and "Register" pages.
•	Users can fill out the registration form (Name, Email, IIT, Sport, Gender) and click "Register." This saves a new entry to the live Firebase database.
•	The "Current Registrations" list automatically loads all entries from the database in real-time.
•	Update (Edit):
o	Users can click an "Edit" button on any card.
o	A pop-up modal appears, pre-filled with that user's data.
o	When "Save Changes" is clicked, the system deletes the old entry and creates a new, updated entry with the new data (as per your simplified logic).
•	Users can click a "Delete" button on any card to permanently remove that entry from the database.
•	Live Data: The connection to Firebase is "real-time." If two people have the site open, a new registration from one person will instantly appear on the other person's screen without a refresh.
•	Stack Order: New registrations appear at the top of the list (newest first).
•	Persistent Storage: All data is saved in the cloud and will be there even if the browser is closed and reopened.
•	Responsive: The site works on all screen sizes (desktop, tablet, and phone).
•	Mobile Hamburger Menu: On mobile, the desktop navigation links are hidden and replaced by a 3-line icon, which opens a full-screen menu.
•	Scrolling List: The "Current Registrations" list is in a container that scrolls on its own, so it doesn't make the page infinitely long as more users register.
•	Sticky Form: On the registration page, the form "sticks" to the top of its column, so you can scroll through the list on the right while the form stays visible.

# Part 2: What The Website Can't Do (Current Limitations)

•	No Real User Accounts: The site uses Anonymous Authentication. This means anyone can register, and anyone can edit or delete anyone else's entry. There is no password, no "login," and no way to protect your own data.
•	No "About" or "Events" Pages: The links in the navbar ("About," "Events," "Sports," etc.) are placeholders. They look correct, but clicking them does nothing, as we only built the "Home" and "Register" pages.
•	No Form Validation (Client-side): The form only checks if "Name" and "Email" are empty. It does not check if an email is a valid email address (e.g., test@test.com) or if a name contains numbers.
•	No Error Messages for User: If a database action fails (e.g., you lose your internet connection and click "Delete"), the app logs an error to the developer console, but it does not show a pop-up message to the user telling them what went wrong.
•	No Search or Filter: You cannot search for a specific name or filter the list to show "only Basketball players." You just see the entire list.
