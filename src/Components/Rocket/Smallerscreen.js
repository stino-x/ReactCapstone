/* eslint-disable react/no-array-index-key */
import React, { useContext } from 'react';
import './Smallerscreen.css';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { UserContext } from '../ContextProvider/UserContextProvider';

export default function Smallerscreen() {
  const { dummyArray } = useContext(UserContext);
  // const [isEven, setIsEven] = useState(true);

  // const toggleClass = () => {
  //   setIsEven((prevIsEven) => !prevIsEven);
  // };

  return (
    <div id="cell-grid">
      {dummyArray.map((item, position) => {
        // Toggle the class based on whether the position is even or odd
        const classNames = `cell ${
          position % 3 === 0 || (position - 1) % 3 === 0 ? 'colored' : 'non-colored'
        }`;
        // Toggle the state for the next iteration

        return (
          <div id="cell" className={classNames} key={position}>
            <div className="map">
              <BsFillArrowRightCircleFill className="arrow" />
            </div>
            <div className="country-name"><span>Country name</span></div>
          </div>
        );
      })}
    </div>
  );
}
