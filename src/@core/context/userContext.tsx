import { createContext, useContext, useState } from 'react';

const UserContext = createContext({});

export function UserWrapper({ children }: any) {
    const [data, setData] = useState<any>([]);
    const [activeStep, setActiveStep] = useState<number>(0)

    return (
        <UserContext.Provider
            value={{
                data, setData, activeStep, setActiveStep
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export default UserContext