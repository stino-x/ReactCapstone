/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/extensions */
import React, { useEffect } from 'react';
import './Mission.css';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { changeStatus, fetchMission } from '../../redux/mission/missionSlice';

let saveJoinedAPI = false;

const Mission = () => {
  const dispatch = useDispatch();

  const missionLog = useSelector((state) => state.missions.missions);

  useEffect(() => {
    // dispatch(fetchMission());
    if (saveJoinedAPI === false) {
      saveJoinedAPI = true;
      dispatch(fetchMission());
    }
  }, []);
  return (
    <Table className="table" striped bordered hover variant="light">
      <thead>
        <tr>
          <th className="Column 1">Mission</th>
          <th className="Column-2">Description</th>
          <th className="Column 3">Status</th>
          <th className="Column 4" />
        </tr>
      </thead>
      <tbody>
        {missionLog.map((mission) => (
          <tr key={mission.id}>
            <td className="Column-1">{mission.name}</td>
            <td className="Column-2">
              <p>
                {mission.description}
              </p>
              {' '}

            </td>
            <td className="Column-3">
              <div className={mission.reserved ? 'status Active' : 'status'}>
                {mission.reserved ? 'Active Member' : 'Not a Member'}
              </div>
            </td>
            <td className="Column-4">
              <div className="centered-content">
                <input type="button" onClick={() => dispatch(changeStatus(mission.id))} className={mission.reserved ? 'leave-mission' : ''} value={!mission.reserved ? 'Join Mission' : 'Leave Mission'} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Mission;
