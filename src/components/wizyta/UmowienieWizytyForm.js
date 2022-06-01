import {Link} from "react-router-dom";
import React, { useState } from 'react';
import Calendar from 'react-calendar';


function UmowienieWizytyForm(props) {
    // const { t } = useTranslation();
    const list = props.pacjenci

  const [value, onChange] = useState(new Date());

    return (

                <div className="w-full lg:w-5/6 p-8 mt-6 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-400 border-rounded">
                    <section class="bg-white-100 border-b  mb-7">
                        <div class="container max-w-5xl mx-auto ">
                              <div class=" md:flex mb-6 mt-4">
                                   <div class="md:w-1/5">
                                         <label class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-2" for="my-select">
                                              Wybierz pacjenta
                                         </label>
                                   </div>
                                   <div class="md:w-3/5">
                                      <select name="" class="form-select block w-full focus:bg-white" id="my-select">
                                           <option value="" label="inny"></option>
                                              {
                                              list.map(pacjent => (
                                                <option value={pacjent.IdPacjent}>{pacjent.Nazwa}</option>
                                                ))}
                                      </select>
                                   </div>
                              </div>
                        </div>
                    </section>
                    <label class="block text-gray-600 font-bold md:text-left mb-6 " for="my-select">
                        Wybierz termin
                    </label>
                    <Calendar onChange={onChange} value={value} />
                </div>
  )
}

export default UmowienieWizytyForm