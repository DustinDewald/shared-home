// src/services/apiClient.js
const BASE_URL = 'http://localhost:3000';

export const apiClient = {
  async post(endpoint: string, body: object) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error('API-Fehler');
    return response.json();
  },
  
  async get(endpoint: string) {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error('API-Fehler');
    return response.json();
  }
};
