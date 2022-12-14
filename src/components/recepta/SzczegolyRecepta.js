import React from "react";
import {useNavigate, useParams} from "react-router";
import {withTranslation} from "react-i18next";
import {
    getReceptaDetails,
    getReceptaLeki
} from "../../axios/ReceptaAxiosCalls";

class SzczegolyRecepta extends React.Component {
    constructor(props) {
        super(props);

        const paramsIdRecepta = this.props.params.IdRecepta
        console.log(paramsIdRecepta)

        this.state = {
            data: {
                Zalecenia: ''
            },
            leki: [],
            error: '',
            isLoaded: false,
            notice: '',
            idRecepta:paramsIdRecepta
        }
    }


    async componentDidMount() {

            try {
                var res = await getReceptaDetails(this.state.idRecepta)
                var data = await res.data

                console.log(data === '')
                this.setState({
                    isLoaded: true,
                    data: data
                });

                res = await getReceptaLeki(this.state.idRecepta)
                data = await res.data

                //console.log(data)
                this.setState({
                    isLoaded: true,
                    leki: data
                });

            } catch (error) {
                console.log(error)
            }
    }


    render() {
        const {data, leki} = this.state
        const {t} = this.props;
        const {navigate} = this.props

        return (
            <div class="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-3 mt-3">
                <div class="w-full lg:w-1/6 lg:px-6 text-gray-800 leading-normal">
                    <p class="text-base font-bold py-2 text-xl lg:pb-6 text-gray-700">{t('recepta.prescriptionDetails')}</p>
                </div>
                <div
                    className="w-full lg:w-5/6 p-8 mt-6 mb-8 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-400 border-rounded">
                    <div className="flex justify-between mt-2">
                        <h2 className=" w-1/3 my-2 mb-6 text-2xl font-black leading-tight text-gray-800">
                            {t('recepta.title')}</h2>
                    </div>

                    <div className="border-4 border-blue-200 h-fit ml-3 rounded-md mx-20 mb-12">
                        <div className="w-full relative mt-">
                            <h2 className="w-full  my-12 mb-5 ml-4 text-lg font-bold leading-tight   text-gray-600">
                                {t('recepta.fields.medicines')}</h2>
                        </div>
                            <div className="shadow-xl">
                            <table className="w-full mb-6 text-sm text-left text-gray-700 dark:text-gray-400">
                                <thead
                                    className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 uppercase py-3 text-center">
                                        {t("lek.fields.name")}</th>
                                    <th scope="col" className="px-6 uppercase py-3 text-center">
                                        {t("lek.fields.quantity")}</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {leki.map(x => (
                                    <tr className="bg-white  dark:bg-gray-800  dark:hover:bg-gray-600"
                                        key={x.ID_lek}>
                                        <td className="px-6 py-2 text-center">{x.Nazwa}</td>
                                        <td className="px-6 py-2 text-center">{x.Ilosc} {x.JednostkaMiary}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            </div>
                        <h2 className=" w-1/3 my-8 mb-8 ml-4 text-lg font-bold leading-tight  text-gray-600">
                            {t('recepta.fields.recommendations')}</h2>
                        <textarea className="shadow-xl form-textarea block w-4/5 focus:bg-white mb-4 px-2 ml-4" id="Notatka"
                                  name="Notatka"
                                  value={data.Zalecenia} rows="6"
                        />
                    </div>


                    <div className=" md:flex mb-6 mt-8 ">
                        <div className="flex pb-3">
                            <button onClick={() => navigate(-1)}
                                    className="shadow-xl bg-red-500 hover:bg-white  hover:text-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                    type="button">
                                {t("button.back")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const withRouter = WrappedComponent => props => {
    const params = useParams();

    return (
        <WrappedComponent
            {...props}
            params={params}
        />
    );
};
const withNavigate = Component => props => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate}/>;
};

export default withTranslation()(withNavigate(withRouter(SzczegolyRecepta)));