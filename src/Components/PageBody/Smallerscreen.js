/* eslint-disable react/no-array-index-key */
import React, { useContext } from 'react';
import './Smallerscreen.css';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { filterCountries } from '../../redux/Current-Location/CurrentLocation';
import { UserContext } from '../ContextProvider/UserContextProvider';

export default function Smallerscreen() {
  const countries = useSelector((state) => state.CurrentLocation.countries);
  const filteredcountries = useSelector((state) => state.CurrentLocation.filteredCountries);
  // const dispatch = useDispatch();
  const {
    inputCountry,
    // changevalueofCountry,
    // selectedContinent,
  } = useContext(UserContext);

  // useEffect(() => {
  //   // Dispatch the filterCountries action when inputCountry changes
  //   dispatch(filterCountries(inputCountry));
  // }, [dispatch, inputCountry]);
  if (countries === undefined) {
    return null; // You can return a loading indicator or handle this as needed
  }

  return (
    <div id="cell-grid">
      {inputCountry !== '' ? (
        filteredcountries.map((item, position) => {
          // Toggle the class based on whether the position is even or odd
          const classNames = `cell ${
            position % 3 === 0 || (position - 1) % 3 === 0 ? 'colored' : 'non-colored'
          }`;

          return (
            <Link to="/cities" key={position}>
              <div id="cell" className={classNames} key={position}>
                <div className="map">
                  <BsFillArrowRightCircleFill className="arrow" />
                </div>
                <div className="flag">
                  <span><img src={item.countryflag} alt="flag" /></span>
                </div>
                <div className="country-name">
                  <span>{item.countryname}</span>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        // Render an alternative message here when countries is empty
        countries.map((item, position) => {
          // Toggle the class based on whether the position is even or odd
          const classNames = `cell ${
            position % 3 === 0 || (position - 1) % 3 === 0 ? 'colored' : 'non-colored'
          }`;

          return (
            <Link to="/cities" key={position}>
              <div id="cell" className={classNames} key={position}>
                <div className="map">
                  <BsFillArrowRightCircleFill className="arrow" />
                </div>
                <div className="flag">
                  <span><img src={item.countryflag} alt="flag" /></span>
                </div>
                <div className="country-name">
                  <span>{item.countryname}</span>
                </div>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
}
