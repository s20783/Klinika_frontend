import React from "react";
import {getLekList} from "../../api/LekApiCalls";
import LekListTable from "./LekListTable";

class LekList extends React.Component {
    constructor(props) {
        super(props);
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
                    console.log(data)
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
        const {error, isLoaded, leki} = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie...</p>
        } else {
            //content = <p>Ładowanie zakończone</p>
            content = <LekListTable leki={leki}/>
        }

        return (
            <main>
              <section class="bg-gray-100 border-b  ">
                <div class="container w-full md:w-4/5 xl:w-3/5  mx-auto px-2 py-8">
                    <div id='recipients' class="p-8 mt-6 lg:mt-0 rounded shadow bg-white">

                        <h2 className="mt-6 w-full my-2 mb-6 text-5xl font-black leading-tight text-center text-gray-800">
                            Leki</h2>
                        {content}
                    </div>
                  </div>
              </section>
            </main>
        )
    }
}

export default LekList;