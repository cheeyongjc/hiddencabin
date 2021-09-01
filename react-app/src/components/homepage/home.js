import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCabinsThunk } from '../../store/cabin';
import './home.css';

function Home() {
    const dispatch = useDispatch();
    const cabins = useSelector(state => {
        return Object.values(state.cabins);
    });

    useEffect(() => {
        dispatch(getCabinsThunk())
    }, [dispatch]);

    return (
        <>
            <div className='cabinsContainer'>

                <div className='cabinList'>
                    {cabins.map(cabin => {
                        return (
                            <div className='singleCabin' key={cabin.id}>
                                <Link to={`cabins/${cabin.id}`}>
                                    <img className='cabinImage' src={cabin.image} alt='cabinImage' />
                                </Link>
                                <div>
                                    Cabin name: {cabin.name}
                                </div>
                                <div>
                                    Price per night: {cabin.price}
                                </div>
                                <div>
                                    Maximum number of guests: {cabin.guests}
                                </div>
                                <div>
                                    Number of beds: {cabin.beds}
                                </div>
                                <div>
                                    Description: {cabin.description}
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </>
    )
}

export default Home;
