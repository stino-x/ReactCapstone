// import React from 'react';
// import { useSelector } from 'react-redux';
// import { ListGroup, Container } from 'react-bootstrap';

// const MyProfile = () => {
//   const missions = useSelector((state) => state.missions.missions);
//   const filteredMissions = missions.filter((mission) => mission.reserved === true);

//   const rockets = useSelector((state) => state.rocket);
//   const filteredRockets = rockets.filter((rocket) => rocket.reserved === true);

//   return (
//     <Container className="d-flex justify-content-center mt-5">
//       <ListGroup className="w-25 me-5">
//         <h2>My Missions</h2>
//         {filteredMissions.length === 0 ? (
//           <p className="text-danger">Please, join a mission to see more...</p>
//         ) : (
//           filteredMissions.map((mission) => (
//             <ListGroup.Item key={mission.id}>{mission.name}</ListGroup.Item>
//           ))
//         )}
//       </ListGroup>
//       <ListGroup className="w-25">
//         <h2>My Rockets</h2>
//         {filteredRockets.length === 0 ? (<p className="text-danger">Please, pick
// a rocket to see more...</p>
//         ) : (
//           filteredRockets.map((rocket) => (
//             <ListGroup.Item key={rocket.id}>{rocket.name}</ListGroup.Item>
//           ))
//         )}
//       </ListGroup>
//     </Container>
//   );
// };

// export default MyProfile;
