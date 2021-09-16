import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import * as actions from '../actions'
import CustomInput from './CustomInput';
class SignIn extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.responseFacebook = this.responseFacebook.bind(this);
    }

    async onSubmit(formDate) {
        await this.props.signIn(formDate);

        if (!this.props.errorMessage) {
            this.props.history.push('/dashboard');
        }

    }

    responseGoogle(res) {
        console.log('called! google', res);
    }

    async responseFacebook(res) {
        await this.props.oauthFacebook(res.accessToken);

        if (!this.props.errorMessage) {
            this.props.history.push('/dashboard');
        }
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="row">

                <div className="col">
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <fieldset>
                            <Field
                                name="email"
                                type="text"
                                id="email"
                                placeholder="example@example.com"
                                label="Enter your email"
                                component={CustomInput}
                            />
                        </fieldset>

                        <fieldset>
                            <Field
                                name="password"
                                type="password"
                                id="password"
                                placeholder="yourpassword"
                                label="Enter your password"
                                component={CustomInput}
                            />
                        </fieldset>

                        {this.props.errorMessage ?
                            <div className="alert alert-danger">
                                {this.props.errorMessage}
                            </div>
                            : null}

                        <button type="submit" className="btn btn-primary">sign in</button>
                    </form>
                </div>

                <div className="col">
                    <div className="text-center">
                        <div className="alert alert-primary">
                            or sign in using third party services
                        </div>
                        <FacebookLogin
                            appId="394571935400991"
                            textButton="Facebook"
                            fields="name,email,picture"
                            callback={this.responseFacebook}
                            cssClass="btn btn-online-primary"
                        />
                        <GoogleLogin
                            clientId="1032155726183-cho0muahlj8cja9itp9pgg32tmadib4f.apps.googleusercontent.com"
                            textButton="Google"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            className="btn btn-online-danger"
                            cookiePolicy={'single_host_origin'}
                            scope='https://www.googleapis.com/auth/userinfo.profile'
                        />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.errorMessage
    }
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'signin' })
)(SignIn)