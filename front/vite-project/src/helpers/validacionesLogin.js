

export const validateLogin = (inputs) => {
    const errores = {};


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
        errores.password = "La contraseña debe tener una letra mayúscula!";
    } else if (!/[0-9]/.test(inputs.password)) {
        errores.password = "La contraseña debe contener al menos un número!";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(inputs.password)) {
        errores.password = "La contraseña debe contener un carácter especial!";
    }
    // Retornar los errores (vacío si no hay errores)
    return errores
}