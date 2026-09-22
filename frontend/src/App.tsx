import { useState } from 'react';
import { Card } from './components/ui/card/card';
import Textfield from './components/input/textfield/textfield';
import Button from './components/input/button/button';
// import { apiClient } from './services/apiClient';

export default function App() {
  const [page, setPage] = useState('home');
  const [regUserName, setRegUserName] = useState("");
  const [regUserEmail, setRegUserEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

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
    <div style={{ padding: '20px', margin: 'auto', display: 'flex',flexDirection:'column',alignItems:'center', gap: 25}}>
      <Card type='wide'>
      <nav style={{ display: 'flex', gap: '20px', marginBottom: '20px', paddingBottom: '10px'}}>
        <Button type='primary' text='Home' handleClick={() => setPage('home')} />
        <Button type='secondary' text='Registrieren' handleClick={() => setPage('register')}/>
      </nav>
    </Card>
      <main style={{width: '100%', display:'flex', justifyContent:'center', gap: 50}}>
        {page === 'home' && (
          <div>
            <h1>Shared Home</h1>
            <p>Willkommen! Das Projekt ist sauber aufgesetzt.</p>
          </div>
        )}

        {page === 'register' && (
          <Card type='square' width={'50%'} innerLayout='columnStart'>
            <h1 style={{marginTop: 0, marginBottom: 24}}>Registrierung</h1>
            <form onSubmit={(e) => handleRegister(e)} style={{display: 'flex', flexDirection:'column', gap: 20}}>
              <Textfield value={regUserName} setValue={setRegUserName} label='Username' />
              <Textfield value={regUserEmail} setValue={setRegUserEmail} label='Email'/>
              <Button type='submit'text='Registrieren' handleClick={() => {}}/>
            </form>
            <br/>
            <text>{statusMessage}</text>
          </Card>
        )}
      </main>
    </div>
  );
}
