import Credits from "../../Components/Global/Credits";
import Planes from "../../Components/Global/Planes";
import ContributionComponent1 from "../../Components/user/Contribution/ContributionComponent1";
function Contribution() {

    return (
        <div>
            <div>
                <ContributionComponent1/>
            </div>
            <div>
                <Planes />
            </div>
            <div>
                <Credits />
            </div>
        </div>
        
    );
}

export default Contribution;
