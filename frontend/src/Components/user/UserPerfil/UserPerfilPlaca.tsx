import "../../../assets/style/UserPerfil/userPerfilePlaca.css"

const UserPerfilPlaca = ({ dato }) => {

    return (
        <>
            <div className="lista">
                {dato.map((item, index) => (
                    <div key={index} className="card">
                        <img src={`http://localhost:8080/images/${item.solarPanel.image_url}`} />
                        <div className="container">
                            <h4><b>{item.solarPanel.model} - {item.project.village_name}</b></h4>
                            <h4><b>{item.project.description}</b></h4>
                        </div>
                    </div>
                ))}
            </div>

        </>
    );

};
export default UserPerfilPlaca;

/*


                <div className='lista'>
                <div className="card">
                    <img src={`http://localhost:8080/images/${dato[0].solarPanel.image_url}`} />
                    <div className="container">
                        <h4><b>{dato[0].solarPanel.model}</b></h4>
                    </div>
                </div>
                <div className="card">
                    <img src={`http://localhost:8080/images/${dato[0].solarPanel.image_url}`} />
                    <div className="container">
                        <h4><b>{dato[0].solarPanel.model}</b></h4>
                    </div>
                </div>
                <div className="card">
                    <img src={`http://localhost:8080/images/${dato[0].solarPanel.image_url}`} />
                    <div className="container">
                        <h4><b>{dato[0].solarPanel.model}</b></h4>
                    </div>
                </div>
                <div className="card">
                    <img src={`http://localhost:8080/images/${dato[0].solarPanel.image_url}`} />
                    <div className="container">
                        <h4><b>{dato[0].solarPanel.model}</b></h4>
                    </div>
                </div>
            </div>
*/