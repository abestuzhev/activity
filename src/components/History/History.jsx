import React from 'react';
import Header from "../Header/Header";

const History = () => {

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

                            </div>
                        </div>
                        <div className="history-stat__col">
                            <div className="history-stat-card">

                            </div>
                        </div>
                        <div className="history-stat__col">
                            <div className="history-stat-card">

                            </div>
                        </div>
                    </div>
                    <div className="history-year">
                        {
                            dayArray.map((item, i) => {
                                return (
                                    <div className="history-year__day" key={i}>{item}</div>
                                )
                            })
                        }
                    </div>
                </div>

            </div>
        </div>

    );
};

export default History;