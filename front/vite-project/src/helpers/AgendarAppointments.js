const rangoDeHoras = (time) => {
    const [hour, minutes] = time.split(":").map(Number);
    const totalMinutos = hour * 60 + minutes;
    const horaDeInicio = 8 * 60;  // 8:00 AM
    const horaDeCierre = 18 * 60; // 6:00 PM

    // Verifica si está fuera del rango
    return totalMinutos < horaDeInicio || totalMinutos >= horaDeCierre;
};

export const validarAgendarTurnos = (inputs) => {
    const errores = {};
    const { date, time } = inputs;

    const selectDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    const twentyFourHoursLater = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    // Validaciones: Date
    if (!date) errores.date = "La fecha es Obligatoria";
    else if (selectDateTime < now) errores.date = "No puede Agendar citas para Fechas pasadas";
    else if (selectDateTime < twentyFourHoursLater) errores.date = "Debe seleccionar una fecha con al menos 24 horas de antelación";
    else if (selectDateTime.getDay() === 0 || selectDateTime.getDay() === 6) errores.date = "No se pueden agendar citas los fines de semana";

    // Validaciones: Time
    if (!time) errores.time = "La hora es Obligatoria";
    else if (rangoDeHoras(time)) errores.time = "La hora debe estar entre las 8 AM y las 6 PM";

    return errores;
};

export default validarAgendarTurnos;