import './Calendar.scss';

const RegularBlock = () => {
    return (
        <div className="calendar__table__block">

        </div>
    )
}

const TaskBlock = () => {
    return (
        <div className="calendar__table__block-select">

        </div>
    )
}

const Calendar = () => {

    const week = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    ];

    // for (let j = 0; j < 24; j++) {
    //     for (let i = 0; i < 7; i++) {
    //         console.log(` ${week[i][j]} a`);
    //     }
        
    // }

    const weekToRender = [];
    for (let i = 0; i < week.length; i++) {
        const day = week[i];
        weekToRender.push([]);
        for (let j = 0; j < day.length; j++) {
            const element = day[j];
            if (element !== 0) {
                weekToRender[i].push(<TaskBlock />)
            } else {
                // default block
                weekToRender[i].push(<RegularBlock />)
            }
            
        }
    }

    const hoursSpanArray = [];
    for (let i = 0; i < 24; i++) {
        hoursSpanArray.push(<span key={i} className="calendar__table__item">{i}</span>);
    }
    return (
        <div id="calendar">
            <div className="calendar__table__wrapper">
                <div className="calendar__table">
                    <div className="calendar__table__whitespace"></div>
                    <div className="calendar__table__hours">
                        {hoursSpanArray}
                    </div>
                    <div className="calendar__table__days">
                        <span className="calendar__table__item">ПН</span> 
                        <span className="calendar__table__item">ВТ</span>
                        <span className="calendar__table__item">СР</span>
                        <span className="calendar__table__item">ЧТ</span>
                        <span className="calendar__table__item">ПТ</span>
                        <span className="calendar__table__item">СБ</span>
                        <span className="calendar__table__item">ВС</span>
                    </div>
                    <div className="calendar__table__table">
                        {weekToRender}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendar;