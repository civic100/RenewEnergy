// En tu UserContext.tsx
import React, { createContext, useState } from 'react';

interface User {
    id_user: string;
    name: string;
    email: string;
    user_type: string;
    image_url: string;
    website: string;
    company_name: string;
}

interface UserContextProps {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const UserContext = createContext<UserContextProps>({
    user: {
        id_user: '',
        name: '',
        email: '',
        user_type: '',
        image_url: '',
        website: '',
        company_name: ''
    },
    setUser: () => { },
});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState<User>({
        id_user: '',
        name: '',
        email: '',
        user_type: '',
        image_url: '',
        website: '',
        company_name: ''
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
