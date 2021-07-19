import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from './index';
import Firebase from '../api/firebase';
import { Flex, Input, Form, ErrorInput } from '../styles/index';
import messages from '../constants/messages';
import routes from '../routers/routes';
import { setUser } from '../store/actions';

const Registration = () => {
  const dispatch = useDispatch();
  const { handleChange, handleSubmit, values, errors, touched, handleBlur } = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().trim().min(5, 'Введите минимум 5 символов').required('Введите имя'),
      email: Yup.string().required('Введите email'),
      password: Yup.string().required('Введите пароль'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Пароли не совпадают').required('Подтвердите пароль')
    }),
    onSubmit: ({ email, password, name }, { setErrors }) => {
      Firebase.registration({ email, password, name })
        .then(user => dispatch(setUser({
          name: user.displayName
        })))
        .catch(error => setErrors({
          [error.type]: error.text
        }));
    }
  });

  return (
    <Flex grow='1' justify='center' alignItems='center'>
      <Form onSubmit={ handleSubmit }>
        <h1>{ messages.registration.title.toUpperCase() }</h1>
        <Input 
          type='text' 
          placeholder='Введите имя'
          name='name'
          onChange={ handleChange }
          onBlur={ handleBlur }
          value={ values.name }
          autoComplete='off'
          isError={ !!errors.name && !!touched.name }
        />
        {touched.name && errors.name && <ErrorInput text={ errors.name } />}
        <Input 
          type='text' 
          placeholder='Введите email'
          name='email'
          onChange={ handleChange }
          onBlur={ handleBlur }
          value={ values.email }
          autoComplete='off'
          isError={ !!errors.email && !!touched.email }
        />
        {touched.email && errors.email && <ErrorInput text={ errors.email } />}
        <Input
          type='password' 
          placeholder='Введите пароль'
          name='password'
          value={ values.password }
          onChange={ handleChange }
          onBlur={ handleBlur }
          isError={ !!errors.password && !!touched.password }
        />
        {touched.password && errors.password && <ErrorInput text={ errors.password } />}
        <Input
          type='password' 
          placeholder='Подтвердите пароль'
          name='confirmPassword'
          value={ values.confirmPassword }
          onChange={ handleChange }
          onBlur={ handleBlur }
          isError={ !!errors.confirmPassword && !!touched.confirmPassword }
        />
        {touched.confirmPassword && errors.confirmPassword && 
          <ErrorInput text={ errors.confirmPassword } />
        }
        <Button 
          name={ messages.registration.buttonRegistration.toUpperCase() }
          isLink={ false }
          border='2px solid black'
          $borderRadius='3px'
          width='100%'
          margin='12px 0 12px 0'
          color='#212121'
          type='submit'
        />
        <StylesBoxLink justify='center'>
          <span>{ messages.registration.isAccount }</span>
          <Button 
            name={ messages.registration.buttonSignIn }
            isLink={ true }
            to={ routes.autorization }
          />
        </StylesBoxLink> 
      </Form>
    </Flex>
  );
};

const StylesBoxLink = styled(Flex)`
  color: black;
  margin-top: 20px;

  a {
    border: none;
    line-height: 1.2;
    height: auto;
    width: auto;
    text-align: left;
    margin-left: 6px;
    font-weight: normal;
    color: blue;
  }

  a:hover {text-decoration: underline;}
`;

export default Registration;
