import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './scss/style.scss';
import {Provider} from "react-redux";
import store from "./redux/store";
import { BrowserRouter} from "react-router-dom";

ReactDOM.render(
  // <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App /> 
        </BrowserRouter>          
      </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);


// для каждой задачи дописать заметки
// добавить установку времени
// добавить таймер помидора
// проверять, если на этот день стоит больше трех задач, то предлагать поставить в другой день
// добавление пользователя и JWT авторизация
// история задач по дням
// статистика продуктивности по времени и выполненным задачам
// приватный список и публичный список в статистике

//аватарки в виде черных человечков
// система рейтинга (соервнование с самим собой) Сэкономленные минуты

// суть - уберечь человека от выгорания и тормозить его активность по средствам ограничений на выполнение большого количества задач

//генерация людей, чтобы они говорили сообщения, так будет казаться что похвала идет от разных людей