import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { UserContext } from '../ContextProvider/UserContextProvider';
import { fetchweather } from '../../redux/Weather-redux/Weatherforstore';

export default function Smallscreencomp() {
  const cities = useSelector((state) => state.Countries.countries);
  const filteredcountries = useSelector((state) => state.Countries.filteredCountries);
  const dispatch = useDispatch();
  const {
    cityInput,
    setweathercountry,
    setcountrytodisplayinsecondpage,
  } = useContext(UserContext);

  useEffect(() => {
    const storedData = localStorage.getItem('countrytodisplayinsecondpage');
    const parsedData = JSON.parse(storedData);

    if (parsedData) {
      setcountrytodisplayinsecondpage(parsedData.countryname);
    }
  }, [setcountrytodisplayinsecondpage, dispatch]);

  // Initialize variables for the JSX content
  let content;

  if (cityInput !== '') {
    if (filteredcountries.length > 0) {
      content = filteredcountries.map((item, position) => {
        // Toggle the class based on whether the position is even or odd
        const classNames = `cell ${
          position % 3 === 0 || (position - 1) % 3 === 0 ? 'colored' : 'non-colored'
        }`;

        return (
          <Link
            to="/weather"
            key={item.id}
            onClick={async () => {
              setweathercountry(item.name);
              localStorage.setItem('countrytoshowweather', JSON.stringify({ weatherlocation: item.name }));
              await dispatch(fetchweather(item.name));
            }}
          >
            <div id="cell" className={classNames} key={item.id}>
              <div className="map">
                <BsFillArrowRightCircleFill className="arrow" />
              </div>
              <div className="flag" />
              <div className="country-name">
                <span>{item.name}</span>
              </div>
            </div>
          </Link>
        );
      });
    } else {
      content = <p>No cities probably an inde state like vatican city.</p>;
    }
  } else if (cities.length > 0) {
    content = cities.map((item, position) => {
      // Toggle the class based on whether the position is even or odd
      const classNames = `cell ${
        position % 3 === 0 || (position - 1) % 3 === 0 ? 'colored' : 'non-colored'
      }`;

      return (
        <Link
          to="/weather"
          key={item.id}
          onClick={async () => {
            setweathercountry(item.name);
            localStorage.setItem('countrytoshowweather', JSON.stringify({ weatherlocation: item.name }));
            await dispatch(fetchweather(item.name));
          }}
        >
          <div id="cell" className={classNames} key={item.id}>
            <div className="map">
              <BsFillArrowRightCircleFill className="arrow" />
            </div>
            <div className="country-name">
              <span>{item.name}</span>
            </div>
          </div>
        </Link>
      );
    });
  } else {
    content = <p>No cities probably an inde state like vatican city.</p>;
  }

  return <div id="cell-grid">{content}</div>;
}
