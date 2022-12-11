import React from "react";
import KontoMenu from "../fragments/KontoMenu";
import {withTranslation} from "react-i18next";
import {getMojeRecepty} from "../../axios/ReceptaAxiosCalls";
import ReceptaTableList from "../recepta/ReceptaTableList";

class KontoRecepty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: '',
            message: '',
            user: '',
            recepty: []
        }
    }

    async componentDidMount() {
        const {navigate} = this.props;
        try {
            const res = await getMojeRecepty()
            var data = await res.data
            console.log(data)

            this.setState({
                isLoaded: true,
                recepty: data
            });
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const {error, isLoaded, recepty} = this.state
        let content;
        const {t} = this.props;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie...</p>
        } else {
            content = <ReceptaTableList recepty={recepty}/>
        }

        return (
            <div class="container w-full flex flex-wrap mx-auto px-2  lg:pt-3 mt-3 mb-3">
                <KontoMenu/>
                <div
                    class="w-full lg:w-5/6 p-8 mt-6 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-400 border-rounded">
                    <section class="bg-white-100 border-b">
                        <div class="container max-w-5xl mx-auto m-0">
                            <div className="w-full mb-4">
                                <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"/>
                            </div>
                            <div className="flex flex-wrap">
                                <div className="w-full p-6">
                                    <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                                        {t("recepta.title")}
                                    </h3>
                                    {content}
                                    <br/>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}

// const withRouter = WrappedComponent => props => {
//     const params = useParams();
//     return (
//         <WrappedComponent
//             {...props}
//             params={params}
//         />
//     );
// };

export default withTranslation()(KontoRecepty);