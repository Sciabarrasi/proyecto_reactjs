import { useReducer } from "react"

const INPUT_ACTIONS = {
    INPUT_CHANGE: 'INPUT_CHANGE',
    CLEAR_INPUTS: 'CLEAR_INPUTS',
    SET_DATA: 'SET_DATA',
    INPUT_FOCUS: 'INPUT_FOCUS'
}

const formReducer = (state, action) => {
    switch(action.type){
        case INPUT_ACTIONS.INPUT_CHANGE:
            const {name, value, error, hasError, isFromValid, active} = action.data;
            return{
                ... state,
                [name]: {
                    value,
                    error,
                    hasError,
                    active,
                },
                isFromValid,
            }
            case INPUT_ACTIONS.INPUT_FOCUS:
                const {name: inputName, active: inputActive} = action.data;
                return {
                    ... state,
                    [inputName]:{
                        ... state[inputName],
                        active: inputActive,
                    }
                }
            case INPUT_ACTIONS.CLEAR_INPUTS:
                return action.data;
            default:
                return state;
    }
}

export const useForm = (initialState) =>{
    const [formState, dispatchFormState] = useReducer(formReducer, initialState)

    const inputHandler = ({name, value}) =>{
        dispatchFormState({
            type: INPUT_ACTIONS.INPUT_CHANGE,
            data:{
                name,
                value,
            }
        })
    }

    const clearInputs = ({formState}) =>{
        dispatchFormState({
            type: INPUT_ACTIONS.CLEAR_INPUTS,
            data: formState,
        })
    }

    const inputFocus= ({ name, active}) =>{
        dispatchFormState({
            type: INPUT_ACTIONS.INPUT_FOCUS,
            data: {
                name,
                active,
            }
        })
    }

    return [formState, inputHandler, clearInputs, inputFocus]
};