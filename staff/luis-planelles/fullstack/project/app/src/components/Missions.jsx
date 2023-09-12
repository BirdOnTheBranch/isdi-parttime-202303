import { useEffect, useState } from 'react';
import retrieveMissions from '../logic/retrieveMissions';
import { context } from '../ui';
import Mission from './Mission';


const Missions = ({lastMissionUpdate}) => {
    const [missions, setMissions] = useState();

    useEffect(() => handleRefreshMission(), [])

    const handleRefreshMission = () => {
        try {

            retrieveMissions(context.token).then((missions) => {

            setMissions(missions)
            }).catch(error => alert(error))
        } catch (error) {
            alert(error.message)
        }
    };
        
    useEffect(() =>{
        if(lastMissionUpdate) handleRefreshMission()
    }, [lastMissionUpdate]);

    return <section className='container'>            
        { missions && missions.map(mission => 
        <Mission
        key={mission.id} 
        mission={mission}
        />)}
    </section>
}


export default Missions