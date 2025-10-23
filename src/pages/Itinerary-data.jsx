import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFlights, getHotels } from "../store/slices/itinerary-slice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ItineraryCard = ({ itinerary }) => (
    <div className="card mb-3">
        <div className="card-header">
            <strong>Day {itinerary?.day}:</strong> {itinerary?.theme}
        </div>
        <div className="card-body">
            <ul className="list-group list-group-flush">
                {itinerary?.activities?.map((activity, i) => (
                    <li className="list-group-item" key={i}>{activity}</li>
                ))}
            </ul>
        </div>
    </div>
);

const ItineraryPage = ({ data }) => {
    const { flightSuccess, hotelSuccess } = useSelector((state) => state.itinerary)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const checkFlight = () => {
        toast('Cheking Flight Data .....')
        dispatch(getFlights({ origin: data.essentialCodes.originAirportCode, destination: data.essentialCodes.destinationAirportCode, departureDate: data.essentialCodes.startDate })).then(() => {
            navigate('/flight')
        })
    }

    const checkHotel = () => {
        toast('Cheking Hotel Data .....')
        dispatch(getHotels({ destination: data.essentialCodes.destinationAirportCode })).then(() => {
            navigate('/hotel')
        })
    }

    useEffect(() => {
        console.log(flightSuccess);

        // if (flightSuccess) {
        //     navigate('/flight')
        // }
        // if(hotelSuccess){
        //     navigate('/hotel')
        // }
    }, [navigate, flightSuccess, hotelSuccess])

    return (
        <div className="container my-5">

            {/* Daily Itinerary */}
            <div className="mb-4">
                <h2>Daily Itinerary</h2>
                {data?.itinerary?.map((day) => (
                    <ItineraryCard itinerary={day} key={day.day} />
                ))}
            </div>

            {/* Tips */}
            <div className="mb-4">
                <h2>Tips</h2>
                <ul className="list-group">
                    {data?.tips?.map((tip, i) => (
                        <li className="list-group-item" key={i}>{tip}</li>
                    ))}
                </ul>
            </div>

            <div className="row justify-content-end  ">
                <div className="col-md-3 col-6">
                    <button
                        className="btn btn-primary w-100"
                        onClick={() => checkFlight()}
                    >
                        Check Flight
                    </button>
                </div>
                <div className="col-md-3 col-6">
                    <button
                        className="btn btn-primary w-100"
                        onClick={() => checkHotel()}
                    >
                        Check Hotels
                    </button>
                </div>
            </div>

        </div>
    );
};

export default ItineraryPage;
