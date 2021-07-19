import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from './index';
import Firebase from '../api/firebase';
import { Flex, Input, Form, ErrorInput } from '../styles/index';
import messages from '../constants/messages';
import routes from '../routers/routes';
import { setUser } from '../store/actions';

const Autorization = () => {
  const dispatch = useDispatch();
  const { handleChange, handleSubmit, values, errors, handleBlur, touched } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Введите email'),
      password: Yup.string().required('Введите пароль'),
    }),
    onSubmit: ({ email, password }, { setErrors }) => {
      Firebase.autorization({ email, password })
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
        <h1>{ messages.autorization.title.toUpperCase() }</h1>
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
        <Button 
          name={ messages.autorization.buttonSignIn.toUpperCase() }
          isLink={ false }
          border='2px solid black'
          $borderRadius='3px'
          width='100%'
          margin='12px 0 12px 0'
          color='#212121'
          type='submit'
        />
        <Button 
          name={ messages.autorization.buttonRegistration.toUpperCase() }
          isLink={ true }
          to={ routes.registration }
          border='2px solid black'
          width='100%'
          $borderRadius='3px'
          color='#212121'
        />
      </Form>
    </Flex>
  );
};

export default Autorization;
