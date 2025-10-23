import React from "react";

function WeatherCard({ data }) {

    const { location, current } = data;
    console.log(current);

    return (
        <div className="container">
            <div
                className="card shadow-sm mt-5  rounded-3"
                style={{
                    backgroundColor: "#6998AB", width: "fit-content", margin: 'auto',
                    minWidth: "350px",
                    padding: "20px"
                }}
            >
                <div className="card-body text-white"  >
                    {/* Location Info */}
                    <div className="text-center mb-3" >
                        <h4 className="fw-bold mb-1">
                            {location.name}, {location.country}
                        </h4>
                        <p className="mb-0">{location.localtime}</p>
                    </div>

                    {/* Temperature & Weather */}
                    <div className="d-flex align-items-center justify-content-center mb-4">
                        <img
                            src={current.condition?.icon}
                            alt={current.condition?.text}
                            className="me-3"
                        />
                        <div>
                            <h1 className="mb-0">{current.temp_c}°C</h1>
                            <small>{current.condition?.text}</small>
                        </div>
                    </div>

                    {/* Extra Weather Details */}
                    <div className="row text-start d-flex m-auto  justify-content-center" style={{ gap: '20px' }}>
                        <div className="">
                            <div className=""><p style={{ fontSize: '15px', fontWeight: 'bold' }}>💧 Humidity: {current.humidity}%</p></div>
                            <div className=""><p style={{ fontSize: '15px', fontWeight: 'bold' }}>💨 Wind: {current.wind_kph} kph / {current.wind_dir}</p></div>
                        </div>
                        <div className="">
                            <div className=""><p style={{ fontSize: '15px', fontWeight: 'bold' }}>🌡️ Feels Like: {current.feelslike_c}°C</p></div>
                            <div className=""><p style={{ fontSize: '15px', fontWeight: 'bold' }}>☁️ Cloud: {current.cloud}%</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div >


    );
}

export default WeatherCard;
