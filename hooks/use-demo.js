import React, {useState, useContext, createContext} from 'react';

const DemoContext = createContext();

export const DemoProvider = ({children}) => {
    const [isDemo, setIsDemo] = useState(false);

    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const value = {
        isDemo,
        setIsDemo
    };

    return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
};

export const useDemo = () => {
    const context = useContext(DemoContext);

    if (context === undefined) {
        throw new Error('useDemo must be used within a DemoProvider');
    }

    return context;
};
