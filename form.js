
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://ireerpscqdwrylbojpga.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyZWVycHNjcWR3cnlsYm9qcGdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxOTM2MDAsImV4cCI6MjA2NTc2OTYwMH0.SQhuxC0vJjtHfgBcK9W1XqDcqmRgXpVvBuaZ8PElRYU'
const supabase = createClient(supabaseUrl, supabaseKey)

navigator.geolocation.getCurrentPosition((pos) => {
  const ubicacion = document.getElementById('ubicacion')
  ubicacion.value = pos.coords.latitude + ',' + pos.coords.longitude
})

document.getElementById('formulario').addEventListener('submit', async (e) => {
  e.preventDefault()
  const data = Object.fromEntries(new FormData(e.target).entries())
  data.desempleado = e.target.desempleado.checked

  const { error } = await supabase.from('solicitudes_ayuda').insert([data])
  if (error) {
    alert('Error: ' + error.message)
  } else {
    alert('¡Formulario enviado exitosamente!')
    e.target.reset()
  }
})
