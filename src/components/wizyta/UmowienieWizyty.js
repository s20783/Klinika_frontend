import {Link} from "react-router-dom";
import React from "react";
import {getKlientPacjentList} from "../../api/PacjentApiCalls";
import UmowienieWizytyForm from "./UmowienieWizytyForm";


class UmowienieWizyty extends React.Component {
    constructor(props) {
            super(props);
            this.state = {
                error: '',
                isLoaded: false,
                pacjenci: [],
                notice: ''
            }
        }

    componentDidMount() {

        const {navigate} = this.props;
                getKlientPacjentList()
                    .then(res => {
                        console.log(res.status)
                        if (res.status === 401) {
                            console.log('Potrzebny aktualny access token')
                            navigate("/", {replace: true});
                        }
                        return res.json()
                    })
                    .then(
                        (data) => {

                            this.setState({
                                isLoaded: true,
                                pacjenci: data
                            });
                        },
                        (error) => {
                            this.setState({
                                isLoaded: true,
                                error
                            });
                        }
                    )
    }

    render() {
        const {error, isLoaded, pacjenci} = this.state
                let content;

                if (error) {
                    content = <p>Błąd: {error.message}</p>
                } else if (!isLoaded) {
                    content = <p>Ładowanie...</p>
                } else {
                    //content = <p>Ładowanie zakończone</p>
                    content = <UmowienieWizytyForm pacjenci={pacjenci}/>
                }


        return(
        <div class="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-3 mt-3">
                 <div class="w-full lg:w-1/6 lg:px-6 text-xl text-gray-800 leading-normal">
                    <p class="text-base font-bold py-2 lg:pb-6 text-gray-700">Umówienie wizyty</p>
                    <div class="block lg:hidden sticky inset-0">
                       <button id="menu-toggle" class="flex w-full justify-end px-3 py-3 bg-white lg:bg-transparent border rounded border-gray-600 hover:border-purple-500 appearance-none focus:outline-none">
                          <svg class="fill-current h-3 float-right" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                             <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                          </svg>
                       </button>
                    </div>
                    {/*<div class="w-full sticky inset-0 hidden h-64 lg:h-auto overflow-x-hidden overflow-y-auto lg:overflow-y-hidden lg:block mt-0 border border-gray-400 lg:border-transparent bg-white shadow lg:shadow-none lg:bg-transparent z-20"  id="menu-content">
                       <ul class="list-reset">
                       <li class="py-2 md:my-0 hover:bg-blue-400 lg:hover:bg-transparent">
                           <a href="#" class="block pl-4 align-middle text-gray-700 no-underline hover:text-blue-400 border-l-4 border-transparent lg:border-blue-400 lg:hover:border-blue-400">
                               <span class="pb-1 md:pb-0 text-sm text-gray-900 font-bold">Pacjent</span>
                           </a>
                       </li>
                          <li class="py-2 md:my-0 hover:bg-blue-400 lg:hover:bg-transparent">
                            <a href="/wizyty" class="block pl-4 align-middle text-gray-700 no-underline hover:text-blue-400 border-l-4 border-transparent lg:hover:border-gray-400">
                                <span class="pb-1 md:pb-0 text-sm">Termin</span>
                            </a>
                         </li>
                          <li class="  py-2 md:my-0 hover:bg-blue-400 lg:hover:bg-transparent">
                             <a href="#" class="  block pl-4 align-middle text-gray-700 no-underline hover:text-blue-400 border-l-4 border-transparent lg:hover:border-gray-400">
                             <span class="  pb-1 md:pb-0 text-sm">Opis</span>
                             </a>
                          </li>


                       </ul>
                    </div>*/}
                 </div>
                 {content}
           </div>
        )
    }
}

// const withRouter = WrappedComponent => props => {
//     const params = useParams();
//     return (
//         <WrappedComponent
//             {...props}
//             params={params}
//         />
//     );
// };

export default UmowienieWizyty;