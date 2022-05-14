import React from "react";
import {getLekList} from "../../api/LekApiCalls";
import LekListTable from "./LekListTable";

class LekList extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            error: '',
            isLoaded: false,
            leki: [],
            notice: ''
        }
    }

    componentDidMount() {
        getLekList()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        leki: data
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
        const {error, isLoaded, leki } = this.state
        let content;

        if(error) {
            content = <p>Błąd: { error.message }</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie...</p>
        } else {
            content = <p>Ładowanie zakończone</p>
            // content = <LekListTable leki={leki} />
        }

        return (
            <main>
                <h2 className="mt-6 w-full my-2 mb-6 text-5xl font-black leading-tight text-center text-gray-800">
                    Leki</h2>
                <p>Lista dostępnych leków</p>
                {content}
            </main>
        )
    }
}

export default LekList;