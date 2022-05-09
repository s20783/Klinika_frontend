import Footer from "./components/fragments/Footer";
import Navigation from "./components/fragments/Navigation";
import MainPage from "./components/other/MainPage";
import {
    Routes,
    Route, BrowserRouter
} from "react-router-dom";
import React from "react";
import Kontakt from "./components/other/Kontakt";
import Login from "./components/other/Login";
import Register from "./components/other/Register";
import {getCurrentUser} from "./components/other/authHelper";

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

                <Navigation/>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/kontakt" element={<Kontakt/>}/>
                    <Route handleLogin={this.handleLogin} path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
                <Footer/>

            </BrowserRouter>
        );
    }
}

export default App;
