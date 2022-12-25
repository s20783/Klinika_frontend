import Footer from "./components/fragments/Footer";
import Navigation from "./components/fragments/Navigation";
import MainPage from "./components/other/MainPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from 'react';
import Kontakt from "./components/other/Kontakt";
import Login from "./components/other/Login";
import Register from "./components/other/Register";
import AfterRegister from "./components/other/AfterRegister";
import {getCurrentUser} from "./components/other/authHelper";
import Konto from "./components/konto/Konto";
import LekList from "./components/lek/LekList";
import LekDetailsList from "./components/lek/LekDetailsList";
import FormularzLeku from "./components/lek/FormularzLeku";
import UsuniecieLeku from "./components/lek/UsuniecieLeku";
import FormularzLekMagazyn from "./components/lek/FormularzLekMagazyn";
import PacjentList from "./components/pacjent/PacjentList";
import FormularzPacjenta from "./components/pacjent/FormularzPacjenta";
import SzczegolyPacjent from "./components/pacjent/SzczegolyPacjent";
import UsunieciePacjenta from "./components/pacjent/UsunieciePacjenta";
import KlientList from "./components/klient/KlientList";
import SzczegolyKlienta from "./components/klient/SzczegolyKlienta";
import SpecjalizacjaList from "./components/specjalizacja/SpecjalizacjaList";
import FormularzSpecjalizacji from "./components/specjalizacja/FormularzSpecjalizacji";
import UsuniecieSpecjalizacji from "./components/specjalizacja/UsuniecieSpecjalizacji";
import ChorobaList from "./components/choroba/ChorobaList";
import FormularzChoroby from "./components/choroba/FormularzChoroby";
import UsuniecieChoroby from "./components/choroba/UsuniecieChoroby";
import UslugaList from "./components/usluga/UslugaList";
import FormularzUslugi from "./components/usluga/FormularzUslugi";
import UsuniecieUslugi from "./components/usluga/UsuniecieUslugi";
import KontoWizyty from "./components/konto/KontoWizyty";
import ZmianaHasla from "./components/konto/ZmianaHasla";
import ZmianaDanychKonta from "./components/konto/ZmianaDanychKonta";
import UmowienieWizyty from "./components/wizyta/UmowienieWizyty";
import WizytaList from "./components/wizyta/WizytaList";
import SzczegolyWizyty from "./components/wizyta/SzczegolyWizyty";
import PotwierdzenieUmowieniaWizyty from "./components/wizyta/PotwierdzenieUmowieniaWizyty";
import WeterynarzList from "./components/weterynarz/WeterynarzList";
import FormularzWeterynarz from "./components/weterynarz/FormularzWeterynarz";
import SzczegolyWeterynarza from "./components/weterynarz/SzczegolyWeterynarza";
import UsuniecieWeterynarza from "./components/weterynarz/UsuniecieWeterynarza";
import KontoPacjenci from "./components/konto/KontoPacjenci";
import Regulamin from "./components/other/Regulamin";
import PolitykaPrywatnosci from "./components/other/PolitykaPrywatnosci";
import UsuniecieLekuMagazyn from "./components/lek/UsuniecieLekuMagazyn";
import HarmonogramForm from "./components/harmonogram/HarmonogramForm";
import KontoHarmonogram from "./components/konto/KontoHarmonogram";
import GodzinyPracy from "./components/godzinyPracy/GodzinyPracy";
import UsuniecieGodzinPracy from "./components/godzinyPracy/UsuniecieGodzinPracy";
import KontoGodzinyPracy from "./components/konto/KontoGodzinyPracy";
import UsuniecieUrlopu from "./components/urlop/UsuniecieUrlopu";
import GodzinyPracyWeterynarz from "./components/weterynarz/GodzinyPracyWeterynarz";
import FormularzUrlop from "./components/urlop/FormularzUrlop";
import CzyDodacGodziny from "./components/godzinyPracy/CzyDodacGodziny";
import SzczepionkaList from "./components/szczepionka/SzczepionkaList";
import FormularzSzczepionki from "./components/szczepionka/FormularzSzczepionki";
import UsuniecieSzczepionki from "./components/szczepionka/UsuniecieSzczepionki";
import FormularzSzczepienia from "./components/szczepienie/FormularzSzczepienia";
import UsuniecieSzczepienia from "./components/szczepienie/UsuniecieSzczepienia";
import FormularzRecepty from "./components/recepta/FormularzRecepty";
import KontoRecepty from "./components/konto/KontoRecepty";
import SzczegolyRecepta from "./components/recepta/SzczegolyRecepta";
import UsuniecieRecepty from "./components/recepta/UsuniecieRecepty";
import Info from "./components/wizyta/FormularzWizyty/Info";
import LekiChoroby from "./components/wizyta/FormularzWizyty/LekiChoroby";
import Uslugi from "./components/wizyta/FormularzWizyty/Uslugi";
import Recepta from "./components/wizyta/FormularzWizyty/Recepta";
import OdwolanieWizyty from "./components/wizyta/OdwolanieWizyty";

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
                    <Route path="/klienci/:IdOsoba" element={<SzczegolyKlienta/>}/>

                    <Route path="/weterynarze" element={<WeterynarzList/>}/>
                    <Route path="/weterynarze/:IdOsoba" element={<SzczegolyWeterynarza/>}/>
                    <Route path="/dodajWeterynarza" element={<FormularzWeterynarz/>}/>
                    <Route path="/weterynarze/edycjaWeterynarza/:IdOsoba" element={<FormularzWeterynarz/>}/>
                    <Route path="/dodajWeterynarza" element={<FormularzWeterynarz/>}/>
                    <Route path="/weterynarze/delete/:IdOsoba" element={<UsuniecieWeterynarza/>}/>
                    <Route path="/godzinyPracyWeterynarz/:IdOsoba" element={<GodzinyPracyWeterynarz/>}/>

                    <Route path="/godzinyPracy/:IdOsoba" element={<GodzinyPracy/>}/>
                    <Route path="/czyDodacGodziny/:IdOsoba" element={<CzyDodacGodziny/>}/>
                    <Route path="/godzinyPracy/delete/:IdOsoba/:Dzien" element={<UsuniecieGodzinPracy/>}/>

                    <Route path="/urlop/:IdVet" element={<FormularzUrlop/>}/>
                    <Route path="/urlop/:IdVet/:IdUrlop" element={<FormularzUrlop/>}/>
                    <Route path="/urlop/delete/:IdUrlop" element={<UsuniecieUrlopu/>}/>

                    <Route path="/specjalizacje" element={<SpecjalizacjaList/>}/>
                    <Route path="/dodajSpecjalizacje" element={<FormularzSpecjalizacji/>}/>
                    <Route path="/specjalizacje/edycjaSpecjalizacja/:idSpecjalizacja"
                           element={<FormularzSpecjalizacji/>}/>
                    <Route path="/specjalizacje/delete/:idSpecjalizacja" element={<UsuniecieSpecjalizacji/>}/>

                    <Route path="/szczepionki" element={<SzczepionkaList/>}/>
                    <Route path="/dodajSzczepionke" element={<FormularzSzczepionki/>}/>
                    <Route path="/szczepionki/edycjaSzczepionki/:idSzczepionka" element={<FormularzSzczepionki/>}/>
                    <Route path="/szczepionki/delete/:idSzczepionka" element={<UsuniecieSzczepionki/>}/>

                    <Route path="/szczepienie/:idPacjent" element={<FormularzSzczepienia/>}/>
                    <Route path="/szczepienie/edit/:idPacjent/:idSzczepienie" element={<FormularzSzczepienia/>}/>
                    <Route path="/szczepienie/delete/:idSzczepienie" element={<UsuniecieSzczepienia/>}/>

                    <Route path="/uslugi" element={<UslugaList/>}/>
                    <Route path="/dodajUsluge" element={<FormularzUslugi/>}/>
                    <Route path="/uslugi/edycjaUsluga/:idUsluga" element={<FormularzUslugi/>}/>
                    <Route path="/uslugi/delete/:idUsluga" element={<UsuniecieUslugi/>}/>

                    <Route path="/konto" element={<Konto/>}/>
                    <Route path="/moiPacjenci" element={<KontoPacjenci/>}/>
                    <Route path="/mojeWizyty" element={<KontoWizyty/>}/>
                    <Route path="/mojHarmonogram" element={<KontoHarmonogram/>}/>
                    <Route path="/godzinyPracy" element={<KontoGodzinyPracy/>}/>
                    <Route path="/zmianaHasla" element={<ZmianaHasla/>}/>
                    <Route path="/zmianaDanychKonta" element={<ZmianaDanychKonta/>}/>

                    <Route path="/umowWizyte" element={<UmowienieWizyty/>}/>
                    <Route path="/umowWizyte/:IdKlient" element={<UmowienieWizyty/>}/>
                    <Route path="/przelozWizyte/:IdWizyta" element={<UmowienieWizyty/>}/>
                    <Route path="/przelozWizyte/:IdWizyta/:IdKlient" element={<UmowienieWizyty/>}/>
                    <Route path="/potwierdzenieWizyty" element={<PotwierdzenieUmowieniaWizyty/>}/>
                    <Route path="/wizyty" element={<WizytaList/>}/>
                    <Route path="/wizyty/:IdWizyta" element={<SzczegolyWizyty/>}/>
                    <Route path="/wizyty/editInfo/:IdWizyta" element={<Info/>}/>
                    <Route path="/wizyty/editMedDise/:IdWizyta" element={<LekiChoroby/>}/>
                    <Route path="/wizyty/editServices/:IdWizyta" element={<Uslugi/>}/>
                    <Route path="/wizyty/editPrescription/:IdWizyta" element={<Recepta/>}/>
                    <Route path="/wizyty/cancel/:IdWizyta/:IdKlient" element={<OdwolanieWizyty/>}/>


                    <Route path="/recepta/:typ/:IdRecepta" element={<FormularzRecepty/>}/>
                    <Route path="/mojeRecepty" element={<KontoRecepty/>}/>
                    <Route path="/recepta/:IdRecepta" element={<SzczegolyRecepta/>}/>
                    <Route path="/recepta/delete/:IdRecepta" element={<UsuniecieRecepty/>}/>

                    <Route path="/choroby" element={<ChorobaList/>}/>
                    <Route path="/dodajChorobe" element={<FormularzChoroby/>}/>
                    <Route path="/choroby/edycjaChoroba/:IdChoroba" element={<FormularzChoroby/>}/>
                    <Route path="/choroby/delete/:IdChoroba" element={<UsuniecieChoroby/>}/>

                    <Route path="/leki" element={<LekList/>}/>
                    <Route path="/leki/:IdLek" element={<LekDetailsList/>}/>
                    <Route path="/dodajLek" element={<FormularzLeku/>}/>
                    <Route path="/leki/edit/:IdLek"
                           element={<FormularzLeku/>}/>
                    <Route path="/leki/delete/:IdLek" element={<UsuniecieLeku/>}/>

                    <Route path="/leki/magazyn/dodajLek/:IdLek" element={<FormularzLekMagazyn/>}/>
                    <Route path="/leki/magazyn/edit/:IdStanLeku" element={<FormularzLekMagazyn/>}/>
                    <Route path="/leki/magazyn/delete/:IdStanLeku" element={<UsuniecieLekuMagazyn/>}/>

                    <Route path="/harmonogram" element={<HarmonogramForm/>}/>

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
