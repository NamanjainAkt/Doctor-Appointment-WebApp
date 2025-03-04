import specialtyImage from './assets/specialty.jpg';
import { useState, useEffect } from 'react';

const [specialties, setSpecialties] = useState([]);

useEffect(() => {
  fetch('/api/specialties')
    .then(res => res.json())
    .then(data => setSpecialties(data))
    .catch(error => console.error('Error loading data:', error));
}, []);

{specialties.length > 0 ? (
  specialties.map((specialty) => (
    <div key={specialty.id}>
      <img src={specialty.imageUrl} alt={specialty.title} />
      <h3>{specialty.title}</h3>
      <p>{specialty.description}</p>
    </div>
  ))
) : (
  <p>No specialties found</p>
)} 