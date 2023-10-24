import toast from "react-hot-toast";

const errorHandling = (errors_list: Array<string>) => {
    errors_list.forEach(error => {
            let errorDisplay: string | undefined = ''

            if (Array.isArray(error)){
                errorDisplay = errorMapping[error[0] as keyof typeof errorMapping];
            }
            else {
                errorDisplay = errorMapping[error as keyof typeof errorMapping];
            }

            toast.error(errorDisplay || 'Hubo un error en el sistema 😔')
        }
    )
}

const errorMapping = {
    "User does not exist on our system." : "El usuario no existe",
    "User is already in our taste club program.": "El usuario ya está activo en nuestro programa",
    "Hour must be before 6 am colombian time.": "La hora debe ser posterior a las 6 am Colombia (GMT-5)",
    "User has no active tier.": "El usuario no tiene una suscripción activa",
    "This email already exists on our database.": "Este correo ya está registrado en nuestro sistema",
    "You must select at least one day." : "Debes seleccionar al menos un día"
}

export default errorHandling;