import React from 'react'
import Input from '../components/InputBox/Input'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getItineray } from '../store/slices/itinerary-slice'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import ItineraryPage from './Itinerary-data'
import WeatherCard from '../components/WeatherCard/WeatherCard'
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

function Home() {

    const dispatch = useDispatch()
    const navigate = useNavigate()




    const { itineraryData, loading, success, weather } = useSelector((state) => state.itinerary)




    const [data, setData] = useState({
        origin: '',
        destination: '',
        type: '',
        startDate: null,
        endDate: null

    })
    const [search, setSearch] = useState('Search')

    const itineraySearch = (e) => {
        e.preventDefault()
        console.log(data);

        dispatch(getItineray(data))
    }

    useEffect(() => {
        if (loading) {
            setSearch('Loading')
            toast.dismiss()
            toast('wait for a second')
        } else {
            setSearch('Search')
        }
        if (success) {
            toast.dismiss()
            toast('Your itineray genrated successfully')
        }
    }, [loading, success])

    return (
        <>
            <div className="hero">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7">
                            <div className="intro-wrap">
                                <h1 className="mb-5"><span className="d-block">Let's Enjoy Your</span> Trip In <span className="typed-words"></span></h1>
                                <div className="row">
                                    <div className="col-12">
                                        <form className="form" onSubmit={itineraySearch}>
                                            <div className="row mb-2">
                                                <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-6">
                                                    <input required onChange={(e) => setData({ ...data, origin: e.target.value })} type="text" className="form-control" name="" placeholder='Origin' />
                                                </div>
                                                <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-6">
                                                    <input required onChange={(e) => setData({ ...data, destination: e.target.value })} type="text" className="form-control" name="" placeholder='Destination' />
                                                </div>

                                            </div>
                                            <div className='mb-2 row'>
                                                <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-6">
                                                    <label htmlFor="">Start Date</label>
                                                    <input required type="date" className="form-control" min={new Date().toISOString().split("T")[0]} onChange={(e) => setData({ ...data, startDate: e.target.value })} />
                                                </div>
                                                <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-6">
                                                    <label htmlFor="">End Date</label>
                                                    <input required type="date" className="form-control" min={new Date().toISOString().split("T")[0]} onChange={(e) => setData({ ...data, endDate: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="row align-items-center">
                                                <div className="col-sm-12 mb-3 mb-lg-2 ">
                                                    <input required onChange={(e) => setData({ ...data, type: e.target.value })} type="text" className="form-control" placeholder="eg: Cultural Tour" />
                                                </div>
                                                <div className="col-sm-12 col-md-6 mb-3 mb-lg-2 col-lg-4">
                                                    <input type="submit" className="btn btn-primary btn-block" value={search} />
                                                </div>

                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 ">
                            <div className="slides d-none d-lg-flex ">
                                <img src="images/hero-slider-1.jpg" alt="Image" className="img-fluid active" />
                                <img src="images/hero-slider-2.jpg" alt="Image" className="img-fluid" />
                                <img src="images/hero-slider-3.jpg" alt="Image" className="img-fluid" />
                                <img src="images/hero-slider-4.jpg" alt="Image" className="img-fluid" />
                                <img src="images/hero-slider-5.jpg" alt="Image" className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        
            {weather && <WeatherCard data={weather} />}
            {itineraryData && <ItineraryPage data={itineraryData} />}
        </>
    )
}

export default Home
