import React, { Component } from 'react'
import './App.css'
import moment from 'moment'
import pluralize from 'pluralize'
import Input from './input'
import { setValue, submit } from './reducers'
import { connect } from 'react-redux'
import { pick } from 'lodash'

const targetTime = moment('2018-11-27 17:00:00')

const mapStateToProps = state =>
    pick(state, [
        'fullName',
        'email',
        'acceptTerms',
        'countdownText',
        'loading',
        'successMessage',
        'errorMessage'
    ])

const mapDispatchToProps = {
    setValue,
    submit
}
/*
const mapDispatchToProps = dispatch => ({
    setFullName: value => dispatch(dispatches.setFullName(value)),
    setEmail: value => dispatch(dispatches.setEmail(value)),
    setAcceptTerms: value => dispatch(dispatches.setAcceptTerms(value)),
    setCountdownText: value => dispatch(dispatches.setCountdownText(value))
})*/

class App extends Component {
    updateTimer = () => {
        const millis = targetTime.diff(moment())
        const duration = moment.duration(millis)
        const seconds = duration.seconds()
        const minutes = duration.minutes()
        const hours = parseInt(duration.asHours())

        this.props.setValue(
            'countdownText',
            `${hours} ${pluralize('Hours', hours)} ${minutes} ${pluralize(
                'Minutes',
                minutes
            )} ${seconds} ${pluralize('Seconds', seconds)}`
        )
    }

    componentDidMount() {
        // setInterval(() => {
        //     this.updateTimer()
        // }, 1000)
        this.updateTimer()
    }

    render() {
        const {
            fullName,
            email,
            acceptTerms,
            countdownText,
            loading,
            successMessage,
            errorMessage
        } = this.props
        return (
            <form
                className="form-signin"
                onSubmit={e => {
                    e.preventDefault()
                    this.props.submit(fullName, email)
                }}
            >
                <h1 className="h3 mb-3 font-weight-normal">
                    Event Sign Up Form
                </h1>
                <h1 className="h5 mb-3 font-weight-normal">{countdownText}</h1>
                <Input
                    id="inputName"
                    label="Full Name"
                    value={fullName}
                    onChange={fullName =>
                        this.props.setValue('fullName', fullName)
                    }
                    required
                />
                <Input
                    id="inputEmail"
                    label="Email"
                    value={email}
                    onChange={email => this.props.setValue('email', email)}
                    required
                />
                <div className="checkbox mb-3">
                    <label>
                        <input
                            type="checkbox"
                            value="remember-me"
                            checked={acceptTerms}
                            onChange={e =>
                                this.props.setValue(
                                    'acceptTerms',
                                    e.target.checked
                                )
                            }
                        />
                        Accept Terms and Conditions
                    </label>
                </div>
                <button
                    className="btn btn-lg btn-primary btn-block"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Loading' : 'Register'}
                </button>
                <div style={{color: (errorMessage ? 'red' : '')}} className="mt-3">{successMessage || errorMessage}</div>
                <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
            </form>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
