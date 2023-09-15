/* eslint-disable react/no-array-index-key */
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
// import { fetchCountries } from '../../redux/Countries/Countries';
import { UserContext } from '../ContextProvider/UserContextProvider';

export default function Smallscreencomp() {
  const cities = useSelector((state) => state.Countries.countries);
  const filteredcountries = useSelector((state) => state.Countries.filteredCountries);
  const dispatch = useDispatch();
  const {
    cityInput,
    // contryCode,
    setcontryCode,
    setcountrytodisplayinsecondpage,
    // setcityInput,
    // selectedContinent,
  } = useContext(UserContext);
  useEffect(() => {
    // Initialize the state from localStorage (if available)
    const storedData = localStorage.getItem('countrytodisplayinsecondpage');
    const parsedData = JSON.parse(storedData);

    if (parsedData) {
      setcountrytodisplayinsecondpage(parsedData.countryname);
      // dispatch(fetchCountries(parsedData.countrycode));
      // setcontryCode(parsedData.countrycode);
    }
  }, [setcountrytodisplayinsecondpage, setcontryCode, dispatch]);
  // useEffect(() => {
  //   console.log('Updated contryCode:', contryCode);
  //   dispatch(fetchCountries(contryCode));
  // }, [dispatch, contryCode]);
  return (
    <div id="cell-grid">
      {cityInput !== '' ? (
        filteredcountries.map((item, position) => {
          // Toggle the class based on whether the position is even or odd
          const classNames = `cell ${
            position % 3 === 0 || (position - 1) % 3 === 0 ? 'colored' : 'non-colored'
          }`;

          return (
            <Link
              to="/myProfile"
              key={position}
            >
              <div id="cell" className={classNames} key={position}>
                <div className="map">
                  <BsFillArrowRightCircleFill className="arrow" />
                </div>
                <div className="flag" />
                <div className="country-name">
                  <span>{item.toponymName}</span>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
      // Render an alternative message here when countries is empty
        cities.map((item, position) => {
        // Toggle the class based on whether the position is even or odd
          const classNames = `cell ${
            position % 3 === 0 || (position - 1) % 3 === 0 ? 'colored' : 'non-colored'
          }`;

          return (
            <Link
              to="/myProfile"
              key={position}
            >
              <div id="cell" className={classNames} key={position}>
                <div className="map">
                  <BsFillArrowRightCircleFill className="arrow" />
                </div>
                <div className="flag" />
                <div className="country-name">
                  <span>{item.toponymName}</span>
                </div>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
}
