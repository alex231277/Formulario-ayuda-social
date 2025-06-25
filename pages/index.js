import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

export default function Home() {
  const [formData, setFormData] = useState({
    nombre: '', cedula: '', telefono: '', direccion: '',
    ubicacion: '', fecha_nacimiento: '', hijos: '',
    desempleado: false, ocupacion: '', nivel_estudio: '', motivo: ''
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setFormData((prev) => ({
        ...prev,
        ubicacion: `${pos.coords.latitude},${pos.coords.longitude}`
      }));
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('solicitudes_ayuda').insert([formData]);
    if (error) alert('Error: ' + error.message);
    else {
      alert('¡Enviado!');
      setFormData({
        nombre: '', cedula: '', telefono: '', direccion: '', ubicacion: '',
        fecha_nacimiento: '', hijos: '', desempleado: false,
        ocupacion: '', nivel_estudio: '', motivo: ''
      });
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto', padding: 20 }}>
      <h1>Formulario Ayuda Social</h1>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 10 }}>
        <input name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
        <input name="cedula" placeholder="Cédula" value={formData.cedula} onChange={handleChange} required />
        <input name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} required />
        <input name="direccion" placeholder="Dirección" value={formData.direccion} onChange={handleChange} required />
        <input name="fecha_nacimiento" type="date" value={formData.fecha_nacimiento} onChange={handleChange} required />
        <input name="hijos" type="number" placeholder="Cantidad de hijos" value={formData.hijos} onChange={handleChange} required />
        <input name="ocupacion" placeholder="Ocupación" value={formData.ocupacion} onChange={handleChange} required />
        <input name="nivel_estudio" placeholder="Nivel de estudio" value={formData.nivel_estudio} onChange={handleChange} required />
        <textarea name="motivo" placeholder="Motivo de la solicitud" value={formData.motivo} onChange={handleChange} required />
        <label>
          <input type="checkbox" name="desempleado" checked={formData.desempleado} onChange={handleChange} />
          Desempleado
        </label>
        <input name="ubicacion" value={formData.ubicacion} readOnly />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
