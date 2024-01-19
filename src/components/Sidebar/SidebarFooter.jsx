import React from 'react';

const SidebarFooter = () => {
    return (
        <div className="sidebar-footer">
            <div className="sidebar-footer-list">
                <div className="sidebar-footer-list__item">
                    <a className="c-link" href="https://ncase.me/remember/ru.html">Ящик Лейтнера</a>
                </div>
                <div className="sidebar-footer-list__item">
                    <a className="c-link" href="https://en.wikipedia.org/wiki/Time_management#The_Eisenhower_Method">Матрица Эйзенхауэра</a>
                    <div className="c-note">
                        Раскидываем эти задачи по 4 квадрантам: "Важное и Срочное", "Важное и Не срочное", "Не важное и Срочное" и "Не важное и не срочное". Так вот задачи, которые оказались у вас в квадранте "Важное и Не срочное", это задачи, выполнение которых принесет вам больше всего счастья и значимости, именно их выполнение двигает вас вперёд
                    </div>
                </div>
            </div>
            <div className="sidebar-footer__about">Version 0.0.1 About Activity</div>

        </div>
    );
};

export default SidebarFooter;