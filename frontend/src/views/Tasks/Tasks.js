import './Tasks.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Schedule from './Schedule';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../../redux/ducks/task';

import AddTask from './addtask';
const Tasks = () => {
    const dispatch = useDispatch();
    const [scheduleOpen, setScheduleOpen] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    const tasks = useSelector(state => state.task.tasks);

    useEffect(() => {
        dispatch(getTasks());
    }, []);

    return (
        <div id="tasks">
            <div className="tasks__header">
                <div className="header__filter">
                    Sort by
                </div>
                <div className="header__action">
                    <div className="header__new header__button" onClick={() => {setPopupOpen(!popupOpen);}}>
                        <span>Create Task</span>
                        <FontAwesomeIcon className="header__icon" icon={faPlusSquare} />
                    </div>
                    <div className="header__generate header__button" onClick={() => {setScheduleOpen(!scheduleOpen)}}>
                        <span>Generate Schedule</span>
                        <FontAwesomeIcon className="header__icon" icon={faCalendarAlt} />
                    </div>
                </div>
            </div>
            <div className="tasks__body">
                <div className="tasks__item"></div>
                <div className="tasks__item"></div>
                <div className="tasks__item"></div>
                <div className="tasks__item"></div>
                <div className="tasks__item"></div>
            </div>
            { popupOpen && <AddTask popupOpen={popupOpen} setPopupOpen={setPopupOpen} />}
            { scheduleOpen && <Schedule scheduleOpen={scheduleOpen} setScheduleOpen={setScheduleOpen}/> }
        </div>
    );
};

export default Tasks;