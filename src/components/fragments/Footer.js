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
            <footer className="p-4 mt- bg-white shadow md:px-6 md:py-1 dark:bg-gray-800">
                <hr className="my-2  border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4"/>
                <div className="max-w-lg mx-auto flex justify-center text-black">
                    <button onClick={() => {this.handleLanguageChange('pl')}} className="hover:text-blue-400">PL</button>
                    <span className="mx-3">•</span>
                    <button onClick={() => {this.handleLanguageChange('en')}} className="hover:text-blue-400">EN</button>
                    <span className="mx-3">•</span>
                    <button onClick={() => {this.handleLanguageChange('ua')}} className="hover:text-blue-400">UA</button>
                </div>
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="https://flowbite.com" className="flex items-center mb-4 sm:mb-0">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"> </span>
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <Link to="/regulamin" className="mr-4 hover:underline md:mr-6 ">{t('footer.regulations')}</Link>
                        </li>
                        <li>
                            <Link to="/politykaPrywatnosci" className="mr-4 hover:underline md:mr-6">{t('footer.policy')}</Link>
                        </li>
                    </ul>
                </div>
            </footer>
        )
    }
}

export default withTranslation() (Footer);