import {Link} from "react-router-dom";

export default function TableItemDetails(props) {
    return (
        <Link to={props.link}
              className="sm:mr-2 sm:ml-2 py-1 px-1">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20" height="20"
                fill="#000000" viewBox="0 0 256 256">
                <rect width="256" height="256" fill="none"/>
                <g className="details-icon-color" opacity="0.1"></g>
                <circle className="details-icon-color hover:white-100" cx="128" cy="128"
                        r="96"
                        fill="none" stroke="#000000" strokeLinecap="round"
                        strokeLinejoin="round" strokeWidth="16"></circle>
                <polyline className="details-icon-color"
                          points="120 120 128 120 128 176 136 176" fill="none"
                          stroke="#000000" strokeLinecap="round"
                          strokeLinejoin="round" strokeWidth="16"></polyline>
                <circle className="details-icon-color dot" cx="126" cy="84"
                        r="12"></circle>
            </svg>
        </Link>
    )
}