import React from "react";
import {getLekDetailsList, getLekList} from "../../api/LekApiCalls";
import LekListTable from "./LekListTable";
import {useParams} from "react-router";
import LekDetailsListTable from "./LekDetailsListTable";

class LekDetailsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            IdLek: this.props.params.IdLek,
            error: '',
            isLoaded: false,
            leki: [],
            notice: ''
        }
    }

    componentDidMount() {
        getLekDetailsList(this.state.IdLek)
            .then(res => res.json())
            .then(
                (data) => {
                    console.log(data[0])
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
            content = <LekDetailsListTable leki={leki}/>
        }

        return (
            <main>
                <section className="bg-gray-100 border-b">
                    <div className="container max-w-5xl mx-auto m-0">
                        <h2 className="mt-6 w-full my-2 mb-6 text-5xl font-black leading-tight text-center text-gray-800">
                            Leki</h2>
                        {content}
                    </div>
                </section>
            </main>
        )
    }
}

const withRouter = WrappedComponent => props => {
    const params = useParams(); // <-- these are the path params
    // etc... other react-router-dom v6 hooks

    return (
        <WrappedComponent
            {...props}
            params={params}
            // etc...
        />
    );
};

export default withRouter(LekDetailsList);