import React from 'react';
import Header from "../../components/Header/Header";
import ChartPie from "../../shared/charts/ChartPie";
import {useSelector} from "react-redux";
import {convertStringToDate} from "../../helpers/helpers";
import moment from "moment";

const History = () => {
    const {tasks} = useSelector((state) => state.tasksPage);

    /**
     * Функция возврата задач по опредленному периоду
     * @param tasks array
     * @param period string
     * @returns {*} array
     */
    const findTaskInPeriod = (tasks, period) => {
        // Записываем в переменную текущий номер месяца
        const currentNumberMonth = moment().month()
        // Записываем в переменную текущий год
        const currentNumberYear = moment().year()
        switch(period){
            case 'month': {
                // При помощи метода filter отсортируем весь список задач по необзодимым условиям
                return tasks.filter(task => {
                    // Получаем номер месяца у задачи
                    const numberMonth = moment(convertStringToDate(task.start)).month()
                    // Получаем год у задачи
                    const numberYear = moment(convertStringToDate(task.start)).year()
                    // Если месяц и год задачи совпадает с текущим, то мы возвращаем его в итерации
                    return currentNumberMonth === numberMonth && currentNumberYear === numberYear
                })
            }
            case 'year': {
                return tasks.filter(task => {
                    const numberYear = moment(convertStringToDate(task.start)).year()
                    return currentNumberYear === numberYear
                })
            }
            default: {
                return tasks

            }
        }
    }

    const allTaskInMonth = findTaskInPeriod(tasks, 'month')
    const allTaskCompletedInMonth = allTaskInMonth.filter(task => task.status)
    const allTaskIsImportantInMonth = allTaskInMonth.filter(task => task.isImportant)

    const allTaskInYear = findTaskInPeriod(tasks, 'year')
    const allTaskObject = allTaskInYear.reduce((result, task) => {
        const numberDay = moment(convertStringToDate(task.start)).dayOfYear()
        result[numberDay] ? result[numberDay] += 1 : result[numberDay] = 1

        return result
    }, {})

    const dayArray = new Array(365).fill("");

    return (
        <div className="frame">
            <Header />
            <div className="frame-area">
                <div className="history">

                    <h1 className="c-title">Статистика</h1>
                    <div className="history-stat">
                        <div className="history-stat__col">
                            <div className="history-stat-card">
                                <div className="history-stat-card__title">Создано задач в этом месяце</div>
                                <div className="history-stat-card-value">
                                    <span className="history-stat-card-value__num">{allTaskInMonth?.length}</span>
                                    <span className="history-stat-card-value__unit">шт.</span>
                                </div>
                            </div>
                        </div>
                        <div className="history-stat__col">
                            <div className="history-stat-card">
                                <div className="history-stat-card__title">Выполненные задачи в этом месяце</div>
                                <div className="history-stat-card-value">
                                    <span className="history-stat-card-value__num">{allTaskCompletedInMonth?.length}</span>
                                    <span className="history-stat-card-value__unit">шт.</span>
                                </div>
                            </div>
                        </div>
                        <div className="history-stat__col">
                            <div className="history-stat-card">
                                <div className="history-stat-card__title">Важных задач</div>
                                <div className="history-stat-card-value">
                                    <span className="history-stat-card-value__num">{allTaskIsImportantInMonth?.length}</span>
                                    <span className="history-stat-card-value__unit">шт.</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="history-year">
                        <div className="history-year__title">Задачи на интервале «Год»</div>
                        <div className="history-year-list">
                            {
                                dayArray.map((item, i) => {
                                    return (
                                        <div className="history-year__day" key={i}>
                                            {allTaskObject[i + 1] && <span className="history-year__active">{allTaskObject[i + 1]}</span>}
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>

                </div>

            </div>
        </div>

    );
};

export default History;