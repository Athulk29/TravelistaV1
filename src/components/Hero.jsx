import React from 'react'

function Hero({ heading }) {
    return (
        <div className="hero">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-7">
                        <div className="intro-wrap">
                            <h1 className="mb-5"><span className="d-block">Let's check Your</span> {heading}</h1>
                            <div className="row">

                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className=" slides d-none d-lg-flex " >
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
    )
}

export default Hero