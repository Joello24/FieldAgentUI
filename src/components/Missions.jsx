import {react, useEffect, useState} from 'react';

const FakeMissions = [

    {   missionId: 81,
        agencyId: 6,
        codeName: "AddTestMission",
        // startDate: "2001-07-26T00:00:00",
        // projectedEndDate: 2025-02-22T00:00:00,
        actualEndDate: null,
        operationalCost: 925.9934,
        notes: "Mauris sit amet eros. Suspendisse accumsan tortor turpis.",
        missionAgent: null
    }
]

function Missions(){
      const [missions, setMissions] = useState(FakeMissions);

      const getMissions = () => {
        fetch('http://localhost:3000/api/v1/missions')
          .then(response => response.json())
          .then(data => setMissions(data))
          .catch(error => console.log(error));
      };

      // useEffect(() => {
      //   getMissions();
      // }, []);

      return (
        <div className="container md:mx-auto w-2/3 flex my-5">
          <ul>
            {missions.map(mission => (
              <li key={mission.missionId}>{mission.agencyId} {mission.codeName} {mission.operationalCost} {mission.notes}</li>
            ))}
          </ul>
        </div>
      );
    };

export default Missions;



    // "missionId": 81,
    // "agencyId": 6,
    // "codeName": "AddTestMission",
    // "startDate": "2001-07-26T00:00:00",
    // "projectedEndDate": "2025-02-22T00:00:00",
    // "actualEndDate": null,
    // "operationalCost": 925.9934,
    // "notes": "Mauris sit amet eros. Suspendisse accumsan tortor turpis.",
    // "missionAgent": null
