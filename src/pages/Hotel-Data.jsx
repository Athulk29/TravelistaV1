import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Hero from '../components/Hero';
import toast from 'react-hot-toast';
import { IoMdArrowRoundBack } from 'react-icons/io';

function HotelList() {
    const { hotels, hotelSuccess } = useSelector((state) => state.itinerary)
    useEffect(() => {
        toast.dismiss()
    }, [])

    const formattedHotels = hotels.data.map((hotel) => ({
        name: hotel.name,
        address: {
            cityName: hotel.address.cityName,
            lines: hotel.address.lines,
        },
        distance: hotel.distance,
        geoCode: hotel.geoCode,
        mapLink: `https://www.google.com/maps?q=${hotel.geoCode.latitude},${hotel.geoCode.longitude}`
    }));
    console.log(formattedHotels);



    return (
        <>
            <Hero heading={'Hotel'} />
            <div className='container py-4'>
                <button className='btn btn-primary mb-5' onClick={() => navigate(-1)}><IoMdArrowRoundBack size={22} /></button>

                {formattedHotels.map((hotel, i) => (
                    // Card container for each hotel
                    <div key={i} className="card mb-4 shadow-lg border-0">
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-start">
                                {/* Hotel Name and Rating */}
                                <div>
                                    <h3 className="card-title fw-bold text-primary mb-1">
                                        {hotel.name}
                                    </h3>
                                    {/* Assuming hotel.rating exists */}
                                    {hotel.rating && (
                                        <p className="text-warning mb-2">
                                            {/* Display stars based on rating, e.g., 5-star rating */}
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-half"></i>
                                            <span className="text-muted ms-2 small">({hotel.rating} / 5)</span>
                                        </p>
                                    )}
                                </div>

                                {/* Price Display (Example - assuming price/currency exist) */}
                                {hotel.price && hotel.currency && (
                                    <div className="text-end">
                                        <span className="h4 fw-bolder text-success mb-0 d-block">
                                            {hotel.currency} {hotel.price}
                                        </span>
                                        <span className="text-muted small">per night</span>
                                    </div>
                                )}
                            </div>

                            <hr className="my-3" />

                            {/* Address and Location Details */}
                            <div className="row g-2">
                                <div className="col-md-6">
                                    <p className="mb-2 text-dark">
                                        <i className="bi bi-geo-alt-fill me-2 text-secondary"></i>
                                        <span className="fw-semibold">Address:</span> {hotel.address.lines.join(", ")}
                                        , {hotel.address.cityName}
                                    </p>
                                </div>
                                <div className="col-md-6">
                                    <p className="mb-2 text-dark">
                                        <i className="bi bi-signpost-2-fill me-2 text-secondary"></i>
                                        <span className="fw-semibold">Proximity:</span> {hotel.distance.value} {hotel.distance.unit} from city
                                    </p>
                                </div>
                                <div className="col-md-12">
                                    <p className="mb-3 text-dark">
                                        <i className="bi bi-compass-fill me-2 text-secondary"></i>
                                        {/* <span className="fw-semibold">Coordinates:</span> {hotel.geoCode.latitude}, {hotel.geoCode.longitude} */}
                                    </p>
                                </div>
                            </div>

                            {/* Map Link Button */}
                            <a
                                href={hotel.mapLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline-primary mt-2"
                            >
                                <i className="bi bi-map-fill me-2"></i>
                                View on Map
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default HotelList
