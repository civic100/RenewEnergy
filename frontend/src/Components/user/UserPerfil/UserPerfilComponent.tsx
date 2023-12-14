import React, { useContext } from 'react';
import { UserContext } from '../../user/Context/UserContext';

const UserProfile: React.FC = () => {
    // Obtén el contexto y el valor del usuario
    const { user } = useContext(UserContext);

    return (
        <div>
            <div>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>User Type: {user.user_type}</p>
                <p>Image URL: {user.image_url}</p>

                {/* Verifica si el usuario es de tipo "company" antes de mostrar estas propiedades */}
                {user.user_type === 'company' && (
                    <div>
                        <p>Website: {user.website}</p>
                        <p>Company Name: {user.company_name}</p>
                    </div>
                )}
            </div>
            <img 
                src={`http://localhost:8080/images/${user.image_url}`} 
                alt={`${user.name}'s Avatar`} 
                style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
            <p>More details about the user...</p>

            {/* Agrega enlaces adicionales */}
            <div>
                <a href="/user/settings">Settings</a>
                <a href="/user/posts">My Posts</a>
            </div>
        </div>
    );
};

export default UserProfile;
