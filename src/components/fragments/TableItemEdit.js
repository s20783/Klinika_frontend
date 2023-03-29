import { Link } from "react-router-dom";

export default function TableItemEdit(props) {
    return (
        <Link to={props.link}
            className="sm:mr-2 sm:ml-2 py-1 px-1">
            <svg 
                xmlns="http://www.w3.org/2000/svg"
                width="20" height="20"
                fill="#000000" viewBox="0 0 256 256">
                <rect className="details-icon-color" width="256" height="256"
                    fill="none"></rect>
                <path className="details-icon-color"
                    d="M96,216H48a8,8,0,0,1-8-8V163.31371a8,8,0,0,1,2.34315-5.65686l120-120a8,8,0,0,1,11.3137,0l44.6863,44.6863a8,8,0,0,1,0,11.3137Z"
                    fill="none" stroke="#000000" strokeLinecap="round"
                    strokeLinejoin="round" strokeWidth="16"></path>
                <line className="details-icon-color" x1="136" y1="64" x2="192" y2="120"
                    fill="none" stroke="#000000" strokeLinecap="round"
                    strokeLinejoin="round" strokeWidth="16"></line>
                <polyline className="details-icon-color"
                    points="216 216 96 216 40.509 160.509" fill="none"
                    stroke="#000000" strokeLinecap="round"
                    strokeLinejoin="round" strokeWidth="16"></polyline>
            </svg>
        </Link>
    )
}