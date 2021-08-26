import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCabinsThunk } from "../../store/cabin";
import cabinReducer from "../../store/cabin";
import './home.css';

function Home() {
    const dispatch = useDispatch();
    const cabins = useSelector(state => {
        return Object.values(state.cabins);
    });
    console.log(cabins);
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
                                <Link to={`cabin/${cabin.id}`}>{cabin.name}</Link>
                                {cabin.price}
                                {cabin.guests}
                                {cabin.beds}
                                {cabin.description}
                            </div>
                        )
                    })}
                </div>

            </div>
        </>
    )
}

export default Home;
