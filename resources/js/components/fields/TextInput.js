import React from 'react';

const TextInput = ((props) => {
    return (
        <div className={props.required ? 'field field--text field--required' : 'field'}>
            <label className={'field__label'} htmlFor={props.name}>
                {props.label}{props.required ? ' *' : null}
            </label>
            {props.required ?
                <input className={'field__input'} name={props.name} id={props.name} onChange={props.onChangeEvent} defaultValue={props.defaultValue} required />
            :
                <input className={'field__input'} name={props.name} id={props.name} onChange={props.onChangeEvent} defaultValue={props.defaultValue} />
            }
            {props.help ?
                <div className={'field__help'}>{props.help}</div>
            : null}
        </div>
    );
});

export default TextInput;
