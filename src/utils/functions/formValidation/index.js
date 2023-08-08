const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,40}$/;
const surnameRegex = /^[a-zA-ZÀ-ÿ\s]{2,40}$/;
const addressRegex = /^[a-zA-ZÀ-ÿ0-9\s]{8,80}$/;
const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const countryRegex = /^[a-zA-ZÀ-ÿ\s]{2,40}$/;

export const validateInput = ({ type, value}) => {
    let hasError = false;
    let error = '';
    const formatValue = value.trim();

    switch(type) {
        case 'name':
            if(formatValue === ""){
                hasError = true;
                error = 'Tu nombre es requerido'
            }else if(!nameRegex.test(formatValue)){
                hasError = true;
                error = "Nombre es inválido";
            }else{
                hasError = false;
                error = '';
            }
            break;
        case 'surname':
            if(formatValue === ""){
                hasError = true;
                error = 'Apellido es requerido';
            }else if(!surnameRegex.test(formatValue)){
                hasError = true;
                error = 'Apellido es inválido';
            }else{
                hasError = false;
                error = '';
            }
            break;
        case 'address':
            if(formatValue === ""){
                hasError = true;
                error = 'Domicilio es requerido';
            }else if(!addressRegex.test(formatValue)){
                hasError = true;
                error = '';
            }
            break;
        case 'email':
            if(formatValue === ""){
                hasError = true;
                error = "Email es requerido";
            }else if(!emailRegex.test(formatValue)){
                hasError = true;
                error = '';
            }
            break;
        case 'country':
            if(formatValue === ""){
                hasError = true;
                error = "País es requerido";
            }else if(!countryRegex.test(formatValue)){
                hasError = true;
                error = '';
            }
            break;
        default:
            hasError = false;
            error = '';
            break;
    }

    return {hasError, error}
}