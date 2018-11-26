import axios from 'axios'

const initialState = {
    loading: false,
    fullName: '',
    email: '',
    acceptTerms: false,
    countdownText: '1 hour 23 minutes 3 seconds',
    successMessage: '',
    errorMessage: ''
}
export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_VALUE':
            if (
                ['fullName', 'email', 'acceptTerms', 'countdownText'].indexOf(
                    action.key
                ) > -1
            ) {
                return {
                    ...state,
                    [action.key]: action.value
                }
            }
            return state
        case 'SUBMIT_PENDING':
            return {
                ...state,
                loading: true
            }
        case 'SUBMIT_FULFILLED':
            return {
                ...state,
                loading: false,
                successMessage: action.payload.data.message
            }
        case 'SUBMIT_REJECTED':
            return {
                ...state,
                loading: false,
                errorMessage: action.payload.response.statusText
            }
        default:
            return state
    }
}

export const setValue = (key, value) => ({
    type: 'SET_VALUE',
    key,
    value
})

export const submit = (fullName, email) => ({
    type: 'SUBMIT',
    payload: axios.post('http://www.mocky.io/v2/5bfbc5983100005b0039ba45', {
        fullName,
        email
    })
})
