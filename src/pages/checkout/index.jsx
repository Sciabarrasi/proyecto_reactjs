import { useState } from "react"
import Input from "../../components/input/inputIndex"
import "./styles.css"
import { useForm } from "../../hooks/useForm";

const initialState = {
    name : { value: '',error: '', hasError: true, active: false, name: 'nombre'},
    apellido : { value: '',error: '', hasError: true, active: false, name: 'apellido'},
    domicilio : { value: '',error: '', hasError: true, active: false, name: 'domicilio'},
    pais : { value: '',error: '', hasError: true, active: false, name: 'pais'},
    mail : { value: '',error: '', hasError: true, active: false, name: 'mail'},
    isFormValid: false,
}

function Checkout() {
    const [formState, inputHandler, clearInputs, inputFocus] = useForm(initialState);

    const onChange = (event) => {
        const {name, value} = event.target;
        inputHandler({name, value})
    }

    const onFocus = ({name, active}) => {
        inputFocus({name, active})
    }

    const onBlur = () => {
        //setActive(false);
    }
    console.log({formState});

    return(
        <div className="checkoutContainer">
            <h1 className="checkoutTittle">Formulario de Compra</h1>
            <form className="checkoutForm">
                <div className="checkoutFormContainer">
                    <div className="checkoutFormInputGroup">
                        <Input
                        placeholder="Ingrese su nombre"
                        id='nombre'
                        name="name"
                        required={true}
                        label="Nombre"
                        onChange={onChange}
                        onFocus={()=> onFocus({name:'name', active: true})}
                        onBlur={onBlur}
                        active={formState.name.Checkout}/>
                    </div>

                    <div className="checkoutFormInputGroup">
                        <Input
                        placeholder="Ingrese su apellido"
                        id='apellido'
                        name="apellido"
                        required={true}
                        label="Apellido"
                        onChange={onChange}
                        onFocus={()=> onFocus({name:'name', active: true})}
                        onBlur={onBlur}
                        active={formState.apellido.Checkout}/>
                    </div>

                    <div className="checkoutFormInputGroup">
                        <Input
                        placeholder="Ingrese su domicilio"
                        id='domicilio'
                        name="domicilio"
                        required={true}
                        label="Domicilio"
                        onChange={onChange}
                        onFocus={()=> onFocus({name:'name', active: true})}
                        onBlur={onBlur}
                        active={formState.domicilio.Checkout}/>
                    </div>

                    <div className="checkoutFormInputGroup">
                        <Input
                        placeholder="Ingrese de que país es"
                        id='pais'
                        name="pais"
                        required={true}
                        label="País"
                        onChange={onChange}
                        onFocus={()=> onFocus({name:'name', active: true})}
                        onBlur={onBlur}
                        active={formState.pais.Checkout}/>
                    </div>

                    <div className="checkoutFormInputGroup">
                        <Input
                        placeholder="Ingrese su mail"
                        id='mail'
                        name="mail"
                        required={true}
                        label="Mail"
                        onChange={onChange}
                        onFocus={()=> onFocus({name:'name', active: true})}
                        onBlur={onBlur}
                        active={formState.mail.Checkout}/>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Checkout