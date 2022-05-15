import React from "react";
import {getLekList} from "../../api/LekApiCalls";
import LekListTable from "./LekListTable";

class PacjentList extends React.Component {
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
        // getLekList()
        //     .then(res => res.json())
        //     .then(
        //         (data) => {
        //             console.log(data)
        //             this.setState({
        //                 isLoaded: true,
        //                 pacjenci: data
        //             });
        //         },
        //         (error) => {
        //             this.setState({
        //                 isLoaded: true,
        //                 error
        //             });
        //         }
        //     )
    }

    render() {
        const {error, isLoaded, pacjenci} = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie...</p>
        } else {
            content = <p>Ładowanie zakończone</p>
            //content = <LekListTable pacjenci={pacjenci}/>
        }

        return (
            <main>
                <section className="bg-gray-100 border-b">
                    <div className="container max-w-5xl mx-auto m-0">
                        <h2 className="mt-6 w-full my-2 mb-6 text-5xl font-black leading-tight text-center text-gray-800">
                            Pacjenci</h2>
                        <p>Lista pacjentów</p>
                        {content}
                    </div>
                </section>
            </main>
        )
    }
}

export default PacjentList;