import React, {useState, createContext} from "react";

export const AddEditContext = createContext([]);

export const AddEditProvider = ({children}) => {
	const [isEdit, setIsEdit] = useState(false);
	return(
		<AddEditContext.Provider value={[isEdit, setIsEdit]}>
			{children}
		</AddEditContext.Provider>
	)
}