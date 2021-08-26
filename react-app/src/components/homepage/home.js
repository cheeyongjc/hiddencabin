import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCabinsThunk } from "../../store/cabin";
import './home.css';

function Home() {
    const dispatch = useDispatch();
    const cabins = useSelector(state => {
        return Object.values(state.cabin);
    });

    useEffect(() => {
        dispatch(getCabinsThunk());
    }, [dispatch]);

    return (
        <>
        
        </>
    )
}
