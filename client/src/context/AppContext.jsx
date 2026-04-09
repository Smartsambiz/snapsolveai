import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children })=>{
    const [question, setQuestion] = useState("");
    const [result, setResult] = useState(null);
    const [jambMode, setJambMode] = useState(false);

    return(
        <AppContext.Provider
            value={{question,
                setQuestion,
                result,
                setResult,
                jambMode,
                setJambMode
            }}>
                {children}
        </AppContext.Provider>
    );
};