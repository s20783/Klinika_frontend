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
import AfterRegister from "./components/other/AfterRegister";
import {getCurrentUser} from "./components/other/authHelper";
import Konto from "./components/konto/Konto";
import LekList from "./components/lek/LekList";
import LekDetailsList from "./components/lek/LekDetailsList";
import PacjentList from "./components/pacjent/PacjentList";
import FormularzPacjenta from "./components/pacjent/FormularzPacjenta";
import SzczegolyPacjent from "./components/pacjent/SzczegolyPacjent";
import UsunieciePacjenta from "./components/pacjent/UsunieciePacjenta";
import KlientList from "./components/klient/KlientList";
import SpecjalizacjaList from "./components/specjalizacja/SpecjalizacjaList";
import FormularzSpecjalizacji from "./components/specjalizacja/FormularzSpecjalizacji";
import UsuniecieSpecjalizacji from "./components/specjalizacja/UsuniecieSpecjalizacji";
import KontoWizyty from "./components/konto/KontoWizyty";
import ZmianaHasla from "./components/konto/ZmianaHasla";
import UmowienieWizyty from "./components/wizyta/UmowienieWizyty";
import PotwierdzenieUmowieniaWizyty from "./components/wizyta/PotwierdzenieUmowieniaWizyty";
import WeterynarzList from "./components/weterynarz/WeterynarzList";
import KontoPacjenci from "./components/konto/KontoPacjenci";
import Regulamin from "./components/other/Regulamin";
import PolitykaPrywatnosci from "./components/other/PolitykaPrywatnosci";

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
                    <Route path="/regulamin" element={<Regulamin/>}/>
                    <Route path="/politykaPrywatnosci" element={<PolitykaPrywatnosci/>}/>

                    <Route path="/login" element={<Login handleLogin={this.handleLogin}/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/afterRegister" element={<AfterRegister/>}/>

                    <Route path="/klienci" element={<KlientList/>}/>

                    <Route path="/weterynarze" element={<WeterynarzList/>}/>

                    <Route path="/specjalizacje" element={<SpecjalizacjaList/>}/>
                    <Route path="/dodajSpecjalizacje" element={<FormularzSpecjalizacji/>}/>
                    <Route path="/specjalizacje/edycjaSpecjalizacja/:idSpecjalizacja" element={<FormularzSpecjalizacji/>}/>
                    <Route path="/specjalizacje/delete/:idSpecjalizacja" element={<UsuniecieSpecjalizacji/>}/>


                    <Route path="/konto" element={<Konto/>}/>
                    <Route path="/moiPacjenci" element={<KontoPacjenci/>}/>
                    <Route path="/mojeWizyty" element={<KontoWizyty/>}/>
                    <Route path="/zmianaHasla" element={<ZmianaHasla/>}/>

                    <Route path="/umowWizyte" element={<UmowienieWizyty/>}/>
                    <Route path="/potwierdzenieWizyty" element={<PotwierdzenieUmowieniaWizyty/>}/>


                    <Route path="/leki" element={<LekList/>}/>
                    <Route path="/leki/:IdLek" element={<LekDetailsList/>}/>

                    <Route path="/pacjenci" element={<PacjentList/>}/>
                    <Route path="/dodajPacjenta" element={<FormularzPacjenta/>}/>
                    <Route path="/pacjenci/edycjaPacjenta/:idPacjent" element={<FormularzPacjenta/>}/>
                    <Route path="/pacjenci/delete/:idPacjent" element={<UsunieciePacjenta/>}/>
                    <Route path="/pacjenci/details/:idPacjent" element={<SzczegolyPacjent/>}/>

                </Routes>
                <Footer/>
            </BrowserRouter>
        );
    }
}

export default App;
