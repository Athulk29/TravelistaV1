import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Hero from '../components/Hero';
import toast from 'react-hot-toast';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
function FlightList() {

    const { flights, } = useSelector((state) => state.itinerary)

    const navigate = useNavigate()

    useEffect(() => {
        toast.dismiss()
    }, [])

    function decodeDuration(duration) {
        const hoursMatch = duration.match(/(\d+)H/);
        const minutesMatch = duration.match(/(\d+)M/);

        const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
        const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;

        if (hours && minutes) return `${hours}h ${minutes}m`;
        if (hours) return `${hours}h`;
        if (minutes) return `${minutes}m`;
        return "0m";
    }


    const formattedFlights = flights?.data?.map((flight) => {
        console.log(flight);

        return {
            id: flight.id,
            price: flight.price.total,
            currency: flight.price.currency,
            itineraries: flight.itineraries.map((itinerary) => ({
                duration: itinerary.duration,
                segments: itinerary.segments.map((seg) => ({
                    from: seg.departure.iataCode,
                    fromTime: seg.departure.at,
                    to: seg.arrival.iataCode,
                    toTime: seg.arrival.at,
                    carrier: seg.carrierCode,
                    flightNumber: seg.number,
                    aircraft: seg.aircraft.code,
                    duration: decodeDuration(seg.duration),
                    stops: seg.numberOfStops,
                }))
            })),
            travelerClass: [...new Set(
                flight.travelerPricings[0].fareDetailsBySegment.map(f => f.cabin)
            )].join(", "),
            includedCheckedBags:
                flight.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags,
        };
    });



    return (

        <>
            <Hero heading={'Flight'} />
            <div className='container py-5'>
                <button className='btn btn-primary mb-5' onClick={() => navigate(-1)}><IoMdArrowRoundBack size={22} /></button>

                {formattedFlights?.map((flight) => (
                    // Outer Card for the entire flight option
                    <div key={flight.id} className="card mb-4 shadow-sm border-0">
                        <div className="card-header bg-primary text-white p-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <h3 className="h5 mb-0">
                                    <i className="bi bi-airplane-fill me-2"></i>
                                    {flight.itineraries[0].segments[0].from} &rarr;{" "}
                                    {flight.itineraries[0].segments.slice(-1)[0].to}
                                </h3>
                                {/* Price Badge on the top right */}
                                <span className="badge bg-light text-primary fs-6 py-2 px-3 fw-bold">
                                    {flight.currency} {flight.price}
                                </span>
                            </div>
                        </div>

                        <div className="card-body">
                            {/* Key Details Row */}
                            <div className="row mb-3 border-bottom pb-3">
                                <div className="col-md-6">
                                    <p className="mb-1 text-muted">
                                        <i className="bi bi-tag-fill me-1 text-primary"></i>
                                        Class: {flight.travelerClass}
                                    </p>
                                </div>
                                <div className="col-md-6">
                                    <p className="mb-1 text-muted">
                                        <i className="bi bi-bag-check-fill me-1 text-primary"></i>
                                        Baggage: {flight.includedCheckedBags.weight}{" "}
                                        {flight.includedCheckedBags.weightUnit}
                                    </p>
                                </div>
                            </div>

                            <h4 className="h6 mt-3 text-secondary fw-bold">Flight Segments</h4>

                            {/* Segments List */}
                            <div className="list-group list-group-flush">
                                {flight.itineraries[0].segments.map((seg, i) => (
                                    <div key={i} className="list-group-item bg-light rounded-3 mb-2">
                                        <div className="d-flex justify-content-between align-items-start">
                                            {/* Route and Times */}
                                            <p className="fw-bold mb-1">
                                                <i className="bi bi-clock me-1 text-info"></i>
                                                {seg.from} ({seg.fromTime}) &rarr; {seg.to} ({seg.toTime})
                                            </p>
                                            {/* Duration Badge */}
                                            <span className="badge bg-info text-dark p-2">
                                                {seg.duration}
                                            </span>
                                        </div>
                                        {/* Flight Details */}
                                        <p className="mt-1 mb-0 small text-dark">
                                            <i className="bi bi-building me-1 text-secondary"></i>
                                            {seg.carrier} {seg.flightNumber} | Aircraft: {seg.aircraft}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default FlightList 