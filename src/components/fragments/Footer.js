import {Link} from "react-router-dom";
import React from "react";
import {withTranslation} from "react-i18next";


class Footer extends React.Component {

    handleLanguageChange = (language) => {
        const  { i18n } = this.props
        i18n.changeLanguage(language, (err, t) => {
            if (err) {
                return console.log('Error when changing language', err);
            }
        });
    }

    render() {
        const {t} = this.props;
        return (
            <footer className="p-3 mt- bg-white shadow md:px-6 md:py-1 dark:bg-gray-800 mt-2">
                <hr className="my-2  border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-2"/>
                <div className="max-w-lg mx-auto flex justify-center text-black">
                    <button onClick={() => {this.handleLanguageChange('pl')}} className="hover:text-blue-400">PL</button>
                    <span className="mx-3">•</span>
                    <button onClick={() => {this.handleLanguageChange('en')}} className="hover:text-blue-400">EN</button>
                    <span className="mx-3">•</span>
                    <button onClick={() => {this.handleLanguageChange('ua')}} className="hover:text-blue-400">UA</button>
                </div>

                <div className="sm:flex sm:items-end sm:justify-between mt-4 mb-2">
                    <ul className="flex flex-wrap items-center justify-center sm:justify-between mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <Link to="" className="hover:underline hover:text-blue-400 md:mr-4 mr-3  md:ml-4 ml-3"><i className="fa-brands fa-facebook"></i>Facebook</Link>
                        </li>
                        <li>
                            <Link to="" className="hover:underline hover:text-red-400 md:mr-4 mr-3  md:ml-4 ml-3"><i className="fa-brands fa-instagram"></i>Instagram</Link>
                        </li>
                    </ul>

                    <ul className="flex flex-wrap items-end justify-center sm:justify-between mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <Link to="/regulamin" className="hover:underline md:mr-4 mr-3  md:ml-4 ml-3">{t('footer.regulations')}</Link>
                        </li>
                        <li>
                            <Link to="/politykaPrywatnosci" className=" hover:underline md:mr-4 mr-3  md:ml-4 ml-3">{t('footer.policy')}</Link>
                        </li>
                    </ul>
                </div>

                <div className="flex items-center justify-center sm:justify-between md:ml-4 ml-2 md:mr-4 mr-2">
                    <p className="flex flex-wrap items-center mb-4 text-sm text-gray-500 sm:mb-0 dark:text-gray-400"><i
                        className="fa-regular fa-copyright"></i>Klinika PetMed 2022</p>
                </div>
            </footer>
        )
    }
}

export default withTranslation() (Footer);