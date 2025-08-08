

export const validateRegister = (inputs) => {
    const errores = {}
   // Validar nombre

    // Validar nombre
    if (!inputs.name.trim()) {
        errores.name = "Escribe tu Nombre!";
    }

    // Validar email
    if (!inputs.email.trim()) {
        errores.email = "Escribe tu Email!";
    } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
        errores.email = "El formato del email es inválido!";
    }

    // Validar fecha de nacimiento
    if (!inputs.birthdate) {
        errores.birthdate = "Escribe tu fecha de nacimiento!";
    } else {
        const today = new Date();
        const birthdate = new Date(inputs.birthdate);
        if (birthdate > today) {
            errores.birthdate = "La fecha de nacimiento no puede ser futura!";
        } else {
            const minAge = 18;
            let age = today.getFullYear() - birthdate.getFullYear();
            const m = today.getMonth() - birthdate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
                age--;
            }
            if (age < minAge) {
                errores.birthdate = `Debes tener al menos ${minAge} años para registrarte!`;
            }
        }
    }

    // Validar número de DNI
    if (!inputs.nDni) {
        errores.nDni = "Escribe tu numero de DNI!";
    } else if (isNaN(inputs.nDni) || inputs.nDni.toString().length !== 8) {
        errores.nDni = "El número de DNI debe ser numérico y tener 8 dígitos!";
    }

    // Validar nombre de usuario
    if (!inputs.username.trim()) {
        errores.username = "Escribe tu Nombre de Usuario!";
    }

    // Validar contraseña
    if (!inputs.password) {
        errores.password = "Escribe tu Contraseña!";
    } else if (inputs.password.length < 6) {
        errores.password = "La contraseña debe tener al menos 6 caracteres!";
    } else if (!/[A-Z]/.test(inputs.password)) {
        errores.password = "La contraseña debe contener una letra mayúscula!";
    } else if (!/[0-9]/.test(inputs.password)) {
        errores.password = "La contraseña debe contener al menos un número!";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(inputs.password)) {
        errores.password = "La contraseña debe contener un carácter especial!";
    }
    // Retornar los errores (vacío si no hay errores)
    
    return errores;
};