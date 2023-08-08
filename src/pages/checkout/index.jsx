import Input from "../../components/input/inputIndex"
import "./styles.css"
import { useForm } from "../../hooks/useForm";

const initialState = {
    name : { value: '',error: '', hasError: true, active: false, name: 'nombre'},
    surname : { value: '',error: '', hasError: true, active: false, name: 'surname'},
    address : { value: '',error: '', hasError: true, active: false, name: 'address'},
    country : { value: '',error: '', hasError: true, active: false, name: 'country'},
    email : { value: '',error: '', hasError: true, active: false, name: 'email'},
    isFormValid: false,
}

function Checkout() {
    const [formState, inputHandler, clearInputs, inputFocus, inputBlur] = useForm(initialState);

    const onChange = (event) => {
        const {name, value} = event.target
        inputHandler({name, value})
    }

    const onFocus = ({name}) => {
        inputFocus({name})
    }

    const onBlur = ({name}) => {
        inputBlur({name});
    }

    const onSubmit = (event) =>{
        event.preventDefault();
        console.log('formState', formState);
    }

    return(
        <div className="checkoutContainer">
            <h1 className="checkoutTittle">Formulario de Compra</h1>
            <form onSubmit={onSubmit} className="checkoutForm">
                <div className="checkoutFormContainer">
                    <div className="checkoutFormInputGroup">
                        <Input
                        placeholder="Ingrese su nombre"
                        id='nombre'
                        name="name"
                        required={true}
                        label="Nombre"
                        onChange={onChange}
                        onFocus={()=> onFocus({name:'name'})}
                        onBlur={()=> onBlur({name:'name'})}
                        active={formState.name.active}
                        error={formState.name.hasError}
                        hasError={formState.name.hasError}
                        maxLength={40}/>
                    </div>
                    <div className="checkoutFormInputGroup">
                        <Input
                        placeholder="Ingrese su apellido"
                        id='surname'
                        name="surname"
                        required={true}
                        label="Apellido"
                        onChange={onChange}
                        onFocus={()=> onFocus({name:'surname'})}
                        onBlur={()=> onBlur({name:'surname'})}
                        active={formState.surname.active}
                        error={formState.surname.hasError}
                        hasError={formState.surname.hasError}
                        maxLength={40}/>
                    </div>
                    <div className="checkoutFormInputGroup">
                        <Input
                        placeholder="Ingrese su domicilio"
                        id='address'
                        name="address"
                        required={true}
                        label="Domicilio"
                        onChange={onChange}
                        onFocus={()=> onFocus({name:'address'})}
                        onBlur={()=> onBlur({name:'address'})}
                        active={formState.address.active}
                        error={formState.address.hasError}
                        hasError={formState.address.hasError}
                        maxLength={40}/>
                    </div>
                    <div className="checkoutFormInputGroup">
                        <Input
                        placeholder="Ingrese de que país es"
                        id='country'
                        name="country"
                        required={true}
                        label="País"
                        onChange={onChange}
                        onFocus={()=> onFocus({name:'country'})}
                        onBlur={()=> onBlur({name:'country'})}
                        active={formState.country.active}
                        error={formState.country.hasError}
                        hasError={formState.country.hasError}
                        maxLength={40}/>
                    </div>
                    <div className="checkoutFormInputGroup">
                        <Input
                        placeholder="Ingrese su mail"
                        id='email'
                        name="email"
                        required={true}
                        label="Email"
                        onChange={onChange}
                        onFocus={()=> onFocus({name:'email'})}
                        onBlur={()=> onBlur({name:'email'})}
                        active={formState.email.active}
                        error={formState.email.hasError}
                        hasError={formState.email.hasError}
                        maxLength={40}/>
                    </div>
                </div>
                <button disabled={!formState.isFormValid} type="submit" className='buttonCheckout'>Comprar</button>
            </form>
        </div>
    )
}

export default Checkout