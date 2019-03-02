
import * as React from 'react';
import * as Yup from 'yup';
import { RouteComponentProps } from 'react-router-dom';
import { Formik, Form, Field, FormikActions, ErrorMessage } from 'formik';
import qs from 'querystring';

import './Login.scss';

export interface LoginProps extends RouteComponentProps {
}

export interface LoginForm {
  username: string;
}

const Login: React.FunctionComponent<LoginProps> = (props) => {
  const initialValues: LoginForm = {
    username: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required'),
  });

  const handleSubmit = (values: LoginForm, actions: FormikActions<LoginForm>) => {
    sessionStorage.setItem('@MyTwitter:username', values.username);
    actions.setSubmitting(false);

    const query: any = qs.parse(props.location.search.replace('?', ''));

    if (query.from) props.history.push(query.from);
    else props.history.push('/');
  };

  return (
    <section className="login">
      <div className="login__wrapper">
        <img
          className="login__image"
          src={ require('../../assets/images/logo.png') }
          alt="MyTwitter"
        />
        <Formik
          initialValues={ initialValues }
          validationSchema={ validationSchema }
          onSubmit={ handleSubmit }
          render={({ errors, isSubmitting }) =>
            <Form className="mt-form">
              <div className="mt-form__group">
                <Field
                  className={ `mt-form__input ${ errors.username! ? 'error' : '' }` }
                  type="text"
                  name="username"
                  placeholder="Username"
                  disabled={ isSubmitting }
                />
                <ErrorMessage className="mt-form__input--error" name="username" component="div" />
              </div>
              <div className="mt-form__group">
                <button
                  className="login__button mt-btn mt-btn--primary"
                  type="submit"
                  disabled={ isSubmitting }
                >
                  Enter
                </button>
              </div>
            </Form>
          }
        />
      </div>
    </section>
  );
};

export default Login;
