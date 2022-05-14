import Footer from "./components/fragments/Footer";
import Navigation from "./components/fragments/Navigation";
import MainPage from "./components/other/MainPage";
import {
    Routes,
    Route, BrowserRouter
} from "react-router-dom";
import React from 'react';
import Kontakt from "./components/other/Kontakt";
import Login from "./components/other/Login";
import Register from "./components/other/Register";
import {getCurrentUser} from "./components/other/authHelper";
import Konto from "./components/konto/Konto";
import {useNavigate} from "react-router";
import LekList from "./components/lek/LekList";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            prevPath: ''
        }

    }

    handleLogin = (user) => {
        localStorage.setItem("user", user)
        //localStorage.setItem("refreshToken", refresh)
        this.setState({user: user})
    }

    handleLogout = () => {
        localStorage.removeItem("user")
        this.setState({user: undefined})
    }

    componentDidMount() {
        const currentUser = getCurrentUser()
        this.setState({user: currentUser})
    }

    render() {
        return (
            <BrowserRouter>
                <Navigation handleLogout={this.handleLogout}/>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/kontakt" element={<Kontakt/>}/>
                    <Route path="/login" element={<Login handleLogin={this.handleLogin}/>}/>
                    <Route path="/register" element={<Register/>}/>

                    <Route path="/konto" element={<Konto/>}/>

                    <Route path="/leki" element={<LekList/>}/>
                </Routes>
                <Footer/>

            </BrowserRouter>
        );
    }
}

export default App;
