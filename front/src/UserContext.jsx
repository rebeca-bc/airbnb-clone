import { createContext, useState } from "react";

// Create a new context called userContext. The default value is an empty object.
export const userContext = createContext({});

// Define a component called userContextProvider. This component will provide the userContext to its children.
export function UserContextProvider({children})
{
    // Use the useState hook to create a state variable for the user. The initial value is null, meaning no user is logged in.
    const [user, setUser] = useState(null);
    
    // Return a userContext.Provider component. This component makes the user and setUser available to all child components.
    // The value prop is an object containing the current user and the setUser function.
    // The children prop is used to render all child components inside this provider.
    return (
        <UserContextProvider value={{user, setUser}}>
            {children}
        </UserContextProvider>
    )
}
