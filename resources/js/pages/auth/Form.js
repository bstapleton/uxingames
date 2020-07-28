import React, {useState, useEffect, Fragment} from 'react';
import { Redirect } from 'react-router-dom';
import TextInput from "../../components/fields/TextInput";
import Notification from "../../components/Notification";

const { verifyTOTP } = require('../../totp');
const auth = require('../../../../auth.json')

const AuthForm = (() => {
    const [redirection, setRedirection] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [fields, setFields] = useState({
        email: null,
        otp: null
    });

    /**
     * Run a check one the email against a valid array of users, and if matching, verify the authenticator code before
     * continuing. Provide some kind of feedback upon failure.
     * @type {login}
     */
    const login = (event => {
        event.preventDefault();
        setErrorMessage(null);
        if (auth.users.includes(fields.email)) {
            return new Promise((resolve) => {
                if (verifyTOTP(fields.otp, auth.secret)) {
                    window.localStorage.setItem('ux-token', auth.token);
                    window.localStorage.setItem('ux-user', fields.email);
                    resolve();
                } else {
                    reject();
                }
            }).then(() => {
                setRedirection('/admin/dashboard');
            }).catch(() => {
                console.error('failed');
                return setErrorMessage('Incorrect authentication code. Please try again.')
            });
        }

        return setErrorMessage('No such user.');
    });

    const handleChange = (event) => {
        fields[event.target.name] = event.target.value;
        setFields(fields);
    }

    return (
        <Fragment>
            {redirection ?
                <Redirect to={redirection} />
            :
                <form method={'post'} onSubmit={login}>
                    {errorMessage ?
                        <Notification
                            type={'error'}
                            message={errorMessage}
                        />
                    : null}
                    <TextInput
                        name={'email'}
                        label={'Email address'}
                        required={true}
                        onChangeEvent={handleChange}
                    />
                    <TextInput
                        name={'otp'}
                        label={'Authenticator code'}
                        required={true}
                        onChangeEvent={handleChange}
                    />
                    <button className={'button button--success'} type={'submit'}>Login</button>
                </form>
            }
        </Fragment>
    );
});

export default AuthForm;
