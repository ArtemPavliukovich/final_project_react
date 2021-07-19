import { START_YEAR } from './config';

const getYears = () => {
  const years = [];

  for (let i = new Date().getFullYear(); i >= START_YEAR; i--) {
    years.push(String(i));
  }

  return years;
};

const messages = {
  header: {
    buttonSignIn: 'Вход',
    buttonSignOut: 'Выход'
  },
  filter: {
    years: getYears(),
    selection: [
      'Рейтинг',
      'Дата релиза(new)',
      'Дата релиза(old)'
    ],
    buttonAddMovie: 'Добавить фильм'
  },
  autorization: {
    title: 'Вход',
    buttonSignIn: 'Войти',
    buttonRegistration: 'Зарегистрироваться'
  },
  registration: {
    title: 'Регистрация',
    buttonRegistration: 'Зарегистрироваться',
    buttonSignIn: 'Войти',
    isAccount: 'Уже есть аккаунт?'
  },
  addMovie: {
    title: 'Фильм',
    buttonAddMovie: 'Добавить фильм',
    buttonClear: 'Очистить'
  }
};

export default messages;