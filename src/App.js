import Footer from "./components/fragments/Footer";
import Navigation from "./components/fragments/Navigation";
import MainPage from "./components/other/MainPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from 'react';
import Contact from "./components/other/Contact";
import Login from "./components/other/Login";
import Register from "./components/other/Register";
import AfterRegister from "./components/client/AfterRegister";
import {getCurrentUser} from "./helpers/authHelper";
import Konto from "./components/account/Account";
import LekList from "./components/medicament/MedicamentList";
import LekDetailsList from "./components/medicament/MedicamentDetailsList";
import FormularzLeku from "./components/medicament/MedicamentForm";
import UsuniecieLeku from "./components/medicament/DeleteMedicamentDialog";
import FormularzLekMagazyn from "./components/medicament/MedicamentWarehouseForm";
import PacjentList from "./components/patient/PatientList";
import FormularzPacjenta from "./components/patient/CreateEditPatient";
import SzczegolyPacjent from "./components/patient/PatientDetails";
import UsunieciePacjenta from "./components/patient/DeletePatientDialog";
import KlientList from "./components/client/ClientList";
import SzczegolyKlienta from "./components/client/ClientDetails";
import SpecjalizacjaList from "./components/specialization/SpecializationList";
import FormularzSpecjalizacji from "./components/specialization/SpecializationForm";
import UsuniecieSpecjalizacji from "./components/specialization/DeleteSpecializationDialog";
import ChorobaList from "./components/disease/DiseaseList";
import FormularzChoroby from "./components/disease/DiseaseForm";
import UsuniecieChoroby from "./components/disease/DeleteDiseaseDialog";
import UslugaList from "./components/service/ServiceList";
import FormularzUslugi from "./components/service/ServiceForm";
import UsuniecieUslugi from "./components/service/DeleteServiceDialog";
import KontoWizyty from "./components/account/KontoWizyty";
import ZmianaHasla from "./components/account/ChangePassword";
import ZmianaDanychKonta from "./components/account/UpdateAccount";
import UmowienieWizyty from "./components/visit/VisitForm";
import WizytaList from "./components/visit/VisitList";
import SzczegolyWizyty from "./components/visit/VisitDetails";
import AfterCreateVisit from "./components/visit/AfterCreateVisit";
import WeterynarzList from "./components/vet/VetList";
import FormularzWeterynarz from "./components/vet/VetForm";
import SzczegolyWeterynarza from "./components/vet/VetDetails";
import UsuniecieWeterynarza from "./components/vet/DeleteVetDialog";
import KontoPacjenci from "./components/account/AccountPatients";
import Regulations from "./components/other/Regulations";
import PrivacyPolicy from "./components/other/PrivacyPolicy";
import UsuniecieLekuMagazyn from "./components/medicament/DeleteMedicamentWarehouseDialog";
import HarmonogramForm from "./components/schedule/ScheduleForm";
import KontoHarmonogram from "./components/account/AccountSchedule";
import GodzinyPracy from "./components/workingHours/WorkingHours";
import UsuniecieGodzinPracy from "./components/workingHours/DeleteWorkingHours";
import KontoGodzinyPracy from "./components/account/AccountWorkingHours";
import UsuniecieUrlopu from "./components/vacation/DeleteVacationDialog";
import GodzinyPracyWeterynarz from "./components/vet/VetWorkingHours";
import FormularzUrlop from "./components/vacation/VacationForm";
import CzyDodacGodziny from "./components/workingHours/CreateWorkingHoursDialog";
import SzczepionkaList from "./components/vaccine/VaccineList";
import FormularzSzczepionki from "./components/vaccine/VaccineForm";
import UsuniecieSzczepionki from "./components/vaccine/DeleteVaccineDialog";
import FormularzSzczepienia from "./components/vaccination/VaccinationForm";
import UsuniecieSzczepienia from "./components/vaccination/DeleteVaccinationDialog";
import FormularzRecepty from "./components/prescription/PrescriptionForm";
import KontoRecepty from "./components/account/AccountPrescriptions";
import SzczegolyRecepta from "./components/prescription/PrescriptionDetails";
import UsuniecieRecepty from "./components/prescription/DeletePrescriptionDialog";
import Info from "./components/visit/visitMenu/Info";
import LekiChoroby from "./components/visit/visitMenu/VisitMedicamentDiseaseList";
import Uslugi from "./components/visit/visitMenu/VisitServiceList";
import Recepta from "./components/visit/visitMenu/VisitPrescriptionList";
import OdwolanieWizyty from "./components/visit/CancelVisit";
import FormularzKlient from "./components/client/ClientForm";
import AfterScheduleUpdate from "./components/schedule/AfterScheduleUpdate";
import UsuniecieKonta from "./components/account/DeleteAccountDialog";
import UsuniecieKlienta from "./components/client/DeleteClientDialog";
import ProtectedRouter from "./helpers/ProtectedRouter";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined
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
                    <Route path="/kontakt" element={<Contact/>}/>
                    <Route path="/regulamin" element={<Regulations/>}/>
                    <Route path="/politykaPrywatnosci" element={<PrivacyPolicy/>}/>

                    <Route path="/login" element={<Login handleLogin={this.handleLogin}/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/afterRegister" element={<AfterRegister/>}/>

                    <Route element={<ProtectedRouter/>}>
                        <Route path="/klienci" element={<KlientList/>}/>
                        <Route path="/klienci/:IdOsoba" element={<SzczegolyKlienta/>}/>
                        <Route path="/dodajKlienta" element={<FormularzKlient/>}/>
                        <Route path="/klienci/delete/:IdOsoba" element={<UsuniecieKlienta/>}/>

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
                        <Route path="/usuniecieKonta" element={<UsuniecieKonta handleLogout={this.handleLogout}/>}/>

                        <Route path="/umowWizyte" element={<UmowienieWizyty/>}/>
                        <Route path="/umowWizyte/:IdKlient" element={<UmowienieWizyty/>}/>
                        <Route path="/przelozWizyte/:IdWizyta" element={<UmowienieWizyty/>}/>
                        <Route path="/przelozWizyte/:IdWizyta/:IdKlient" element={<UmowienieWizyty/>}/>
                        <Route path="/potwierdzenieWizyty" element={<AfterCreateVisit/>}/>
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
                        <Route path="/harmonogram/:action" element={<AfterScheduleUpdate/>}/>

                        <Route path="/pacjenci" element={<PacjentList/>}/>
                        <Route path="/dodajPacjenta" element={<FormularzPacjenta/>}/>
                        <Route path="/pacjenci/edycjaPacjenta/:idPacjent" element={<FormularzPacjenta/>}/>
                        <Route path="/pacjenci/delete/:idPacjent" element={<UsunieciePacjenta/>}/>
                        <Route path="/pacjenci/details/:idPacjent" element={<SzczegolyPacjent/>}/>
                    </Route>
                </Routes>
                <Footer/>
            </BrowserRouter>
        );
    }
}

export default App;
