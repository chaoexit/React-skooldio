import React from 'react'

const Input = props => (
    <div>
        <label htmlFor={props.id}>{props.label}</label>
        <input
            type={props.type || 'text'}
            id={props.id}
            className="form-control"
            placeholder={props.label}
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
            required={props.required}
        />
    </div>
)

export default Input
