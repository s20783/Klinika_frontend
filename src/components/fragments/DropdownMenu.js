import React, { useState, useEffect, useRef } from "react";
import {getImie} from "../other/authHelper";
import Dropdown from "./Dropdown";

function DropdownMenu(props) {
    const [dropdown, setDropdown] = useState(false);
    let ref = useRef();

    useEffect(() => {
        const handler = (event) => {
            if (dropdown && ref.current && !ref.current.contains(event.target)) {
                setDropdown(false);
            }
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
        };
    }, [dropdown]);

    const onMouseEnter = () => {
        window.innerWidth > 960 && setDropdown(true);
    };

    const onMouseLeave = () => {
        window.innerWidth > 960 && setDropdown(false);
    };

    return (
        <div onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}>
            <button id="userMenu"
                    className="flex items-center shadow bg-blue-400 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white text-sm md:text-base font-bold py-2 px-4 rounded"
                    aria-expanded={dropdown ? "true" : "false"}
                    onClick={() => { setDropdown((prev) => !prev)}}>

                <div className="flex items-center text-sm">
                    <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                            className="object-cover w-full h-full rounded-full"
                            src="/images/avatar_photo.jpg"
                            alt="avatar_logo"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"/>
                    </div>
                    <div>
                        <p className="font-semibold">{getImie()}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400"/>
                    </div>
                </div>
                <svg className="pl-3 h-3 fill-current text-white" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129"
                     xmlnsXlink="http://www.w3.org/1999/xlink"
                     enableBackground="new 0 0 129 129">
                    <g>
                        <path
                            d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z"/>
                    </g>
                </svg>
            </button>

            {
                dropdown && <Dropdown logout={props.logout}/>
            }
        </div>
    );
}

export default DropdownMenu;