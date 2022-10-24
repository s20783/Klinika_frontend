import React from "react";
import {useTranslation} from "react-i18next";
import {Link,useLocation} from "react-router-dom";

function AfterRegister(props) {
    const {t} = useTranslation();
   // const received = useLocation().state
   //console.log(received)
    return (
        <body class="bg-gray-200 flex items-center justify-center h-screen">
            <div class="modal-overlay absolute w-full h-full bg-gray-500 opacity-50"></div>
            <div class="modal-container bg-white w-full md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
              <div class="modal-content py-9 px-7 text-left px-5">
                <div class="flex justify-between items-center pb-3">
                  <p class="text-3xl font-bold text-blue-400 p-3">Dziękujemy! </p>
                </div>

                <p class="text-2xl text-center font-bold">Twoje konto zostało utworzone. Zaloguj się, aby umówić wizytę.</p>
                <img src="/images/gti.png"/>

                <div class="flex justify-end pt-2">
                    <Link to="/">
                     <button  class="px-4 bg-transparent p-3 rounded-lg text-blue-400 hover:bg-gray-100 hover:text-blue-400 mr-2">Powrót</button>
                    </Link>
                 <Link to="/login">
                     <button class=" px-4 bg-blue-400 p-3 rounded-lg text-white hover:bg-blue-400">Zaloguj się</button>
                 </Link>
                </div>
              </div>
            </div>
        </body>
    )
}
// const withNavigate = Component => props => {
//     const navigate = useNavigate();
 //    return <Component {...props} navigate={navigate} />;
 //};



export default AfterRegister
