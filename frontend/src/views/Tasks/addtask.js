import { useRef, useState } from 'react';
import DayPickerInput from 'react-day-picker';
import './addTask.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { createTask } from '../../redux/ducks/task';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';


const AddTask = props => {
    const nameRef = useRef();
    const descRef = useRef();
    const priorityRef = useRef();
    const etaRef = useRef();
    const dispatch = useDispatch();
    const [subTasks, setSubTasks] = useState([]);
    const [selectedDay, setSelectedDay] = useState();

    const handleCreateTask = () => {
        const task = {
            name: nameRef.current.value,
            description: descRef.current.value,
            importance: priorityRef.current.value,
            estimated_time: etaRef.current.value,
            deadline: selectedDay.toISOString().slice(0, 19).replace('T', ' '),
            type: 'consistent',
            subTasks
        };

        dispatch(createTask(task));
    };

    const handleDayClick = day => {
        const dateNow = new Date();
        if (day > dateNow) {
            setSelectedDay(day);
        }
    };

    const handleAddSub = () => {
        const subTask = {
            name: ''
        };
        setSubTasks([...subTasks, subTask]);
    };

    const removeSubtask = e => {
        let array = [...subTasks];
        array.splice(e, 1);
        setSubTasks(array);
    };

    return (
        <div className='modal'>
            <div className='modal__content'>
                <div className="modal__top">
                    <div className="modal__left">
                        <label for="name" className="modal__label">Name</label>
                        <input type="text" className="modal__input" ref={nameRef} name="name" />

                        <label for="description" className="modal__label">Description</label>
                        <textarea type="text" className="modal__input modal__description" ref={descRef} name="description" />

                        <div className="bottom__wrapper">
                            <div className="bottom__left">
                                <label for="deadline" className="modal__label">Deadline</label>
                                <DayPickerInput
                                    className="deadline__input"
                                    onDayClick={handleDayClick}
                                    selectedDays={selectedDay}
                                />
                            </div>
                            <div className="bottom__right">
                                <label for="priority" className="modal__label">Priority</label>
                                <select name="priority" className="modal__select" ref={priorityRef}>
                                    <option value="high">High</option>
                                    <option value="medium">Medium</option>
                                    <option value="low">Low</option>
                                </select>

                                <label for="eta" className="modal__label">Estimated time</label>
                                <select name="eta" className="modal__select" ref={etaRef}>
                                    <option value="1">1 hour</option>
                                    <option value="2">2 hours</option>
                                    <option value="3">3 hours</option>
                                    <option value="4">4 hours</option>
                                    <option value="5">5 hours</option>
                                    <option value="6">6 hours</option>
                                    <option value="7">7 hours</option>
                                    <option value="8">8 hours</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="modal__right">
                        <div className="modal__label">Subtasks <FontAwesomeIcon icon={faPlus} onClick={handleAddSub} className="subtask__add" /></div>
                        <div className="subtask__container">
                            {
                                subTasks.map((el, idx) => {
                                    return (
                                        <div className="subtask" key={idx}>
                                            <div className="subtask__top">
                                                <label for="name" className="subtask__label">Name</label>
                                                <FontAwesomeIcon onClick={() => removeSubtask(idx)} className="subtask__delete" icon={faMinus} />
                                            </div>
                                            <input type="text" className="subtask__input" name="name" />
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
                <button className="modal__submit" onClick={handleCreateTask}>
                    Add task
                </button>
                <FontAwesomeIcon className="modal__close" onClick={() => props.setPopupOpen(false)} icon={faTimes} />
            </div>
        </div>
    )
};


export default AddTask;
