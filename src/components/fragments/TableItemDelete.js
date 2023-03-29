import { Link } from "react-router-dom";

export default function TableItemDelete(props) {
    return (
        <Link to={props.link}
            className="sm:mr-2 sm:ml-2 py-1 px-1">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20" height="20"
                fill="#000000" viewBox="0 0 256 256">
                <rect width="256" height="256" fill="none"></rect>
                <line className="details-icon-color" x1="215.99609" y1="56"
                    x2="39.99609" y2="56.00005" fill="none" stroke="#000000"
                    strokeLinecap="round" strokeLinejoin="round"
                    strokeWidth="16"></line>
                <line className="details-icon-color" x1="104" y1="104" x2="104" y2="168"
                    fill="none" stroke="#000000" strokeLinecap="round"
                    strokeLinejoin="round" strokeWidth="16"></line>
                <line className="details-icon-color" x1="152" y1="104" x2="152" y2="168"
                    fill="none" stroke="#000000" strokeLinecap="round"
                    strokeLinejoin="round" strokeWidth="16"></line>
                <path className="details-icon-color"
                    d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56" fill="none"
                    stroke="#000000" strokeLinecap="round"
                    strokeLinejoin="round" strokeWidth="16"></path>
                <path className="details-icon-color"
                    d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56"
                    fill="none" stroke="#000000" strokeLinecap="round"
                    strokeLinejoin="round" strokeWidth="16"></path>
            </svg>
        </Link>
    )
}