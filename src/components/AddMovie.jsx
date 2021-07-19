import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import { Button } from './index';
import Firebase from '../api/firebase';
import { Flex, Input, Form, ErrorInput } from '../styles/index';
import messages from '../constants/messages';
import { REQUIRED, GENRES_RUS } from '../constants/config';
import{ formItemsStyles } from '../styles/styles';

const AddMovie = () => {
  const { handleChange, handleSubmit, values, errors, touched, handleBlur, handleReset } = useFormik({
    initialValues: {
      title: '',
      overview: '',
      poster_path: '',
      backdrop_path: '',
      release_date: '',
      vote_average: '',
      vote_count: '',
      genre_ids: [],
      adult: false
    },
    validationSchema: Yup.object({
      title: Yup.string().min(3, 'Слишком короткое название').required(REQUIRED),
      overview: Yup.string()
        .min(6, 'Слишком короткое описание')
        .max(150, 'Слишком длинное описание')
        .required(REQUIRED),
      poster_path: Yup.string().required(REQUIRED),
      backdrop_path: Yup.string().required(REQUIRED),
      release_date: Yup.string().required(REQUIRED),
      genre_ids: Yup.array().min(1, REQUIRED),
      vote_average: Yup.number()
        .typeError('Введите число')
        .max(10, 'Рейтинг превышает допустимое значение')
        .required(REQUIRED),
      vote_count: Yup.number().typeError('Введите число').required(REQUIRED),
      adult: Yup.bool().required(REQUIRED)
    }),
    onSubmit: values => {
      const movie = {
        id: nanoid(),
        title: values.title,
        overview: values.overview,
        release_date: values.release_date,
        backdrop_path: values.backdrop_path,
        poster_path: values.poster_path,
        vote_average: +values.vote_average,
        vote_count: +values.vote_count,
        genre_ids: values.genre_ids.map(id => +id),
        adult: values.adult,
        year: new Date(values.release_date).getFullYear(),
      };
      
      Firebase.addMovie(movie);
      handleReset();
    }
  });

  return (
    <Flex grow='1' justify='center' alignItems='center'>
      <Form onSubmit={ handleSubmit } onReset={ handleReset }>
        <h1>{ messages.addMovie.title.toUpperCase() }</h1>
        <Input 
          type='text' 
          placeholder='Название фильма'
          name='title'
          onChange={ handleChange }
          onBlur={ handleBlur }
          value={ values.title }
          autoComplete='off'
          isError={ !!errors.title && !!touched.title }
        />
        {touched.title && errors.title && <ErrorInput text={ errors.title } />}
        <Overview
          placeholder='Описание'
          name='overview'
          rows='3'
          onChange={ handleChange }
          onBlur={ handleBlur }
          value={ values.overview }
          isError={ !!errors.overview && !!touched.overview }
        />
        {touched.overview && errors.overview && <ErrorInput text={ errors.overview } />}
        <Input 
          type='text' 
          placeholder='Путь к постеру фильма'
          name='poster_path'
          onChange={ handleChange }
          onBlur={ handleBlur }
          value={ values.poster_path }
          autoComplete='off'
          isError={ !!errors.poster_path && !!touched.poster_path }
        />
        {touched.poster_path && errors.poster_path && <ErrorInput text={ errors.poster_path } />}
        <Input 
          type='text' 
          placeholder='Путь к обложке фильма'
          name='backdrop_path'
          onChange={ handleChange }
          onBlur={ handleBlur }
          value={ values.backdrop_path }
          autoComplete='off'
          isError={ !!errors.backdrop_path && !!touched.backdrop_path }
        />
        {touched.backdrop_path && errors.backdrop_path && <ErrorInput text={ errors.backdrop_path } />}
        <Input
          type='date'
          placeholder={ values.release_date ? null : 'Выберите дату релиза' }
          name='release_date'
          value={ values.release_date }
          onChange={ handleChange }
          onBlur={ handleBlur }
          isError={ !!errors.release_date && !!touched.release_date }
        />
        {touched.release_date && errors.release_date && <ErrorInput text={ errors.release_date } />}
        <Select
          multiple
          name='genre_ids'
          value={ values.genre_ids }
          onChange={ handleChange }
          onBlur={ handleBlur }
          isError={ !!errors.genre_ids && !!touched.genre_ids }
        >
          {Object.values(GENRES_RUS).map(genre => 
            <option value={ genre.id } key={ genre.id }>
              { genre.name }
            </option>
          )}
        </Select>
        {touched.genre_ids && errors.genre_ids && <ErrorInput text={ errors.genre_ids } />}
        <Input
          type='text'
          placeholder='Укажите рейтинг фильма'
          name='vote_average'
          value={ values.vote_average }
          onChange={ handleChange }
          onBlur={ handleBlur }
          autoComplete='off'
          isError={ !!errors.vote_average && !!touched.vote_average }
        />
        {touched.vote_average && errors.vote_average && <ErrorInput text={ errors.vote_average } />}
        <Input
          type='text'
          placeholder='Укажите количество голосов'
          name='vote_count'
          value={ values.vote_count }
          onChange={ handleChange }
          onBlur={ handleBlur }
          autoComplete='off'
          isError={ !!errors.vote_count && !!touched.vote_count }
        />
        {touched.vote_count && errors.vote_count && <ErrorInput text={ errors.vote_count } />}
        <Flex alignItems='center'>
          <CheckBox
            type='checkbox'
            name='adult'
            id='adult'
            checked={ values.adult }
            onChange={ handleChange }
            isError={ false }
          />
          <Label htmlFor='adult'>18+</Label>
        </Flex>
        <Button 
          name={ messages.addMovie.buttonAddMovie.toUpperCase() }
          isLink={ false }
          type='submit'
          $borderRadius='4px'
          border='2px solid black'
          width='100%'
          color='black'
          margin='24px 0 12px 0'
        />
        <Button 
          name={ messages.addMovie.buttonClear.toUpperCase() }
          isLink={ false }
          type='reset'
          $borderRadius='4px'
          border='2px solid black'
          width='100%'
          color='black'
        />
      </Form>
    </Flex>
  );
};

const Overview = styled.textarea`
  ${formItemsStyles};
  resize: none;
  margin-bottom: 16px;
`;

const Select = styled.select`
  ${formItemsStyles};
  height: 80px;
`;

const CheckBox = styled(Input)`
  width: 16px;
  height: 16px;
  margin: 0 6px 0 12px;
`;

const Label = styled.label`
  color: black;
  font-size: 16px;
`;

export default AddMovie;
