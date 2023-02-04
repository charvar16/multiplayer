import { createContext } from 'react';
export const MoveContext = createContext();

const MoveContextProvider = (props) =>{
    return(
        <MoveContext.Provider value={props.value}>
            {props.children}
        </MoveContext.Provider>
    )
}

export default MoveContextProvider