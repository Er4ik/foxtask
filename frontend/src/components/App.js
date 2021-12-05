import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router";
import { getUser } from "../redux/ducks/auth";
import Calendar from "../views/Calendar/Calendar";
import Home from '../views/Home/Home';
import Login from "../views/Login";
import Signup from "../views/Signup";
import Tasks from "../views/Tasks/Tasks";
import Sidebar from "./sidebar/Sidebar";

const SidebarLayout = ({ children }) => (
    <div className="app">
        <Sidebar />
        {children}
    </div>
);

const App = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        if (!user && !localStorage.getItem('Auth')) {
            navigate('/login');
        }
        dispatch(getUser());
    }, []);

    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<SidebarLayout><Home /></SidebarLayout>} />
                <Route path="/tasks" element={<SidebarLayout><Tasks /></SidebarLayout>} />
                <Route path="/calendar" element={<SidebarLayout><Calendar /></SidebarLayout>} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </div>
    );
};

export default App;