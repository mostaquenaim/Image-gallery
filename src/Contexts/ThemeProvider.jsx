import { createContext, useState } from "react";
import PropTypes from 'prop-types';

export const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('retro');

    const info ={
        theme,
        setTheme
    }

    return (
        <ThemeContext.Provider value={info}>
            {children}
        </ThemeContext.Provider>
    );
};

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired
};
export default ThemeProvider;