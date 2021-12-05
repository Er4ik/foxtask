import './Tasks.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Schedule from './Schedule';

const Tasks = () => {
    const [scheduleOpen, setScheduleOpen] = useState(false);
    return (
        <div id="tasks">
            <div className="tasks__header">
                <div className="header__filter">
                    Sort by
                </div>
                <div className="header__action">
                    <div className="header__new header__button">
                        <span>Create Task</span>
                        <FontAwesomeIcon className="header__icon" icon={faPlusSquare} />
                    </div>
                    <div className="header__generate header__button" onClick={() => setScheduleOpen(!scheduleOpen)}>
                        <span>Generate Schedule</span>
                        <FontAwesomeIcon className="header__icon" icon={faCalendarAlt} />
                    </div>
                </div>
            </div>
            <div className="tasks__body">
                <div className="tasks__item">
                    <div className="tasks__title">
                        <div className="tasks__name">Task</div>
                        <div className="tasks__id">#5</div>
                    </div>
                    <div className="tasks__due">Due to 12/4/2021</div>
                    <div className="tasks__desc">adfgjadflvbalvxmzcvnadfkjb</div>
                    <div className="tasks__tags">red, grey, blue</div>
                </div>
            </div>
            { scheduleOpen && <Schedule scheduleOpen={scheduleOpen} setScheduleOpen={setScheduleOpen}/> }
            {/* <Schedule scheduleOpen={scheduleOpen} setScheduleOpen={setScheduleOpen}/> */}
        </div>
    );
};

export default Tasks;