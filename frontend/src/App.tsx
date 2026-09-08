import { useState } from 'react';
// import { apiClient } from './services/apiClient';

export default function App() {
  const [page, setPage] = useState('home');
  const [regUserName, setRegUserName] = useState("");
  const [regUserEmail, setRegUserEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleNameInput = (e: React.ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>): void => {
    setRegUserName(e.target.value);
  }

  const handleEmailInput = (e: React.ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>): void => {
    setRegUserEmail(e.target.value);
  }

  const handleRegister = async (e: React.SubmitEvent) => {
    e.preventDefault(); // Verhindert das Neuladen der Seite
    setStatusMessage('');

    try {
      // Direkter Fetch-Aufruf an Ihr NestJS-Backend
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: regUserEmail, name: regUserName }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage(`Erfolgreich registriert! User-ID in Docker: ${data.id}`);
        setRegUserEmail('');
        setRegUserName('');
      } else {
        setStatusMessage(`Fehler vom Backend: ${data.message || 'Ungültige Daten'}`);
      }
    } catch (error) {
      const message = `${error}: Verbindung zum NestJS-Backend fehlgeschlagen.`
      setStatusMessage(message);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <nav style={{ display: 'flex', gap: '20px', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #eee' }}>
        <button onClick={() => setPage('home')} style={{ cursor: 'pointer' }}>🏠 Startseite</button>
        <button onClick={() => setPage('register')} style={{ cursor: 'pointer' }}>📝 Registrieren</button>
      </nav>

      <main>
        {page === 'home' && (
          <div>
            <h1>Shared Home</h1>
            <p>Willkommen! Das Projekt ist sauber aufgesetzt.</p>
          </div>
        )}

        {page === 'register' && (
          <div>
            <h1>Registrierung</h1>
            <form onSubmit={(e) => handleRegister(e)}>
            <textarea value={regUserName} onChange={(e) => {handleNameInput(e)}} />
            <textarea value={regUserEmail} onChange={(e) => {handleEmailInput(e)}} />
            <button type='submit'>create user</button>
            </form>
            <br/>
            <text>{statusMessage}</text>
          </div>
        )}
      </main>
    </div>
  );
}
