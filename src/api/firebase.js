import firebase from 'firebase/app';
import 'firebase/auth';

const URL_OVERVIEWS = 'https://media-library-react-default-rtdb.europe-west1.firebasedatabase.app/overviews.json';
const URL_EXCEPTS = 'https://media-library-react-default-rtdb.europe-west1.firebasedatabase.app/excepts.json';
const URL_ADMIN_MOVIES = 'https://media-library-react-default-rtdb.europe-west1.firebasedatabase.app/movies.json';

const CONFIG = {
  apiKey: 'AIzaSyCPTPg0zS-yz9UESkZdFPbrQhhQ-2x0YDY',
  authDomain: 'media-library-react.firebaseapp.com',
  projectId: 'media-library-react',
  storageBucket: 'media-library-react.appspot.com',
  messagingSenderId: '915711040590',
  appId: '1:915711040590:web:8f52034f56b4648b2db71f'
};

const getError = (err) => {
  switch (err) {
    case 'auth/email-already-in-use':
      return {
        type: 'email',
        text: 'Такой адрес электронной почты уже используется'
      };
    case 'auth/invalid-email':
      return {
        type: 'email',
        text: 'Введите правильный адрес почты'
      };
    case 'auth/operation-not-allowed':
      return {
        type: 'email',
        text: 'Операция не доступна, обратитесь в службу поддерки'
      };
    case 'auth/weak-password':
      return {
        type: 'password',
        text: 'Придумайте более сложный пароль'
      };
    case 'auth/user-disabled':
      return {
        type: 'email',
        text: 'Вы были отключены от системы, авторизируйтесь заново'
      };
    case 'auth/user-not-found':
      return {
        type: 'email',
        text: 'Не правильно введен адрес электронной почты'
      };
    case 'auth/wrong-password':
      return {
        type: 'password',
        text: 'Не правильно введен пароль'
      };
    default:
      return {
        type: 'password',
        text: 'Ошибка, повторите запрос'
      };
  }
};

export default class Firebase {
  static init () {
    firebase.initializeApp(CONFIG);
  }

  static autorization ({ email, password }) {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(userCredential => resolve(userCredential.user))
        .catch(err => reject(getError(err.code)));
    });
  }

  static registration ({ email, password, name }) {
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          userCredential.user.updateProfile({displayName: name})
            .then(() => resolve(userCredential.user))
            .catch(() => reject(this.getUser()))
        })
        .catch(err => reject(getError(err.code)));
    });
  } 

  static isAutorization () {
    return new Promise(resolve => {
      firebase.auth().onAuthStateChanged(user => {
        user ? resolve(true) : resolve(false);
      });
    });
  }

  static getUser () {
    return firebase.auth().currentUser;
  }

  static exit () {
    return firebase.auth().signOut();
  }

  static setOverviewMovie ({ id, overview, date }) {
    return fetch(URL_OVERVIEWS, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ id, overview, date }),
    });
  }

  static deleteMovie ({ id, year }) {
    return fetch(URL_EXCEPTS, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ id, year })
    });
  }

  static addMovie (movie) {
    return fetch(URL_ADMIN_MOVIES, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ movie })
    });
  }

  static getOverviews () {
    return fetch(URL_OVERVIEWS).then(response => response.json());
  }

  static getDeleteMovies () {
    return fetch(URL_EXCEPTS).then(response => response.json());
  }

  static getAdminMovies () {
    return fetch(URL_ADMIN_MOVIES).then(response => response.json());
  }
}