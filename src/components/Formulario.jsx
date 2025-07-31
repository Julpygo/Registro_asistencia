import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
} from '@mui/material';
import PieChart from './PieChart';

export default function Formulario() {
  const [attendanceIn, setAttendanceIn] = useState('');
  const [attendanceOut, setAttendanceOut] = useState('');
  const [concepts, setConcepts] = useState([
    { id: 'HO', name: 'Hora ordinaria', start: '08:00', end: '17:59' },
    { id: 'HED', name: 'Hora extra diurna', start: '18:00', end: '20:59' },
    { id: 'HEN', name: 'Hora extra nocturna', start: '21:00', end: '05:59' },
  ]);
  const [graficoData, setGraficoData] = useState(null);

  const handleConceptChange = (index, field, value) => {
    const nuevosConceptos = [...concepts];
    nuevosConceptos[index][field] = value;
    setConcepts(nuevosConceptos);
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const payload = {
    attendanceIn,
    attendanceOut,
    concepts,
  };

  try {
    const response = await fetch("https://falconcloud.co/site_srv10_ph/site/api/qserv.php/13465-770721", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const resultado = await response.json();
    setGraficoData(resultado);
  } catch (err) {
    alert("Error al enviar: " + err.message);
  }
};

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, p: 3, bgcolor: '#fff', borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom>
          Registro de asistencia
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Hora de entrada"
                type="time"
                fullWidth
                value={attendanceIn}
                onChange={(e) => setAttendanceIn(e.target.value)}
                sx={{ width: '180px' }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Hora de salida"
                type="time"
                fullWidth
                value={attendanceOut}
                onChange={(e) => setAttendanceOut(e.target.value)}
                sx={{ width: '180px' }}
              />
            </Grid>

            {concepts.map((concepto, index) => (
              <Grid container spacing={2} key={index} sx={{ mt: 2 }}>
                <Grid item xs={3}>
                  <TextField
                    label="ID"
                    value={concepto.id}
                    onChange={(e) => handleConceptChange(index, 'id', e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Nombre"
                    value={concepto.name}
                    onChange={(e) => handleConceptChange(index, 'name', e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Inicio"
                    type="time"
                    value={concepto.start}
                    onChange={(e) => handleConceptChange(index, 'start', e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Fin"
                    type="time"
                    value={concepto.end}
                    onChange={(e) => handleConceptChange(index, 'end', e.target.value)}
                    fullWidth
                  />
                </Grid>
              </Grid>
            ))}
          </Grid>

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
            Enviar
          </Button>
          {graficoData && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Distribución de horas
              </Typography>
              <PieChart data={graficoData} />
            </Box>
          )}
        </form>
      </Box>
    </Container>
  );
}