// количество страниц в пагинаторе, не считая "вернуться к первой / последней"
export const COUNT_PAGE = 5;

// количество фильмов на странице
export const NUM_MOVIES_PAGE = 20;

// год до которого работает фильтр
export const START_YEAR = 2000;

// в форме добавления фильма, сообщение о том, что поле обязательно для заполнения
export const REQUIRED = 'Поле обязательно для заполнения!';

// варианты оценки фильма
export const RATINGS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

// переведенные жанры фильмов
export const GENRES_RUS = {
  "Action": {
    name: "Боевик",
    id: 28
  },
  "Adventure": {
    name: "Приключения",
    id: 12
  },
  "Animation": {
    name: "Аниме",
    id: 16
  },
  "Comedy": {
    name: "Комедия",
    id: 35
  },
  "Crime": {
    name: "Криминал",
    id: 80
  },
  "Documentary": {
    name: "Документальный",
    id: 99
  },
  "Drama": {
    name: "Драма",
    id: 18
  },
  "Family": {
    name: "Семейный",
    id: 10751
  },
  "Fantasy": {
    name: "Фантастика",
    id: 14
  },
  "History": {
    name: "История",
    id: 36
  },
  "Horror": {
    name: "Ужасы",
    id: 27
  },
  "Music": {
    name: "Музыка",
    id: 10402
  },
  "Mystery": {
    name: "Мистический",
    id: 9648
  },
  "Romance": {
    name: "Мелодрама",
    id: 10749
  },
  "Science Fiction": {
    name: "Научная фантастика",
    id: 878
  },
  "TV Movie": {
    name: "ТВ шоу",
    id: 10770
  },
  "Thriller": {
    name: "Триллер",
    id: 53
  },
  "War": {
    name: "Военный",
    id: 10752
  },
  "Western": {
    name: "Вестерн",
    id: 37
  }
};