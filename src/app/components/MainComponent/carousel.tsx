import React from 'react';

export const Carousel = () => {
  return (
    <>
      {/* owl slider start */}
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          {/* <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li> */}
          <li
            data-target="#carouselExampleIndicators"
            className="active"
            data-slide-to={0}
          />
          {/* <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li> */}
        </ol>
        <div className="carousel-inner">
          {/* <div class="carousel-item active">
      <img src="assets/images/banner1.jpg" class="img-fluid m-auto" alt="">
      </div>
      <div class="carousel-item">
      <img src="assets/images/banner2.jpg" class="img-fluid m-auto" alt="">
      </div> */}
          <div className="carousel-item active">
            <img
              src="/assets/images/banner3.webp"
              className="img-fluid m-auto"
              alt=""
            />
          </div>
          {/* <div class="carousel-item">
      <img src="assets/images/banner4.jpg" class="img-fluid m-auto" alt="">
      </div>
      <div class="carousel-item">
      <img src="assets/images/banner5.jpg" class="img-fluid m-auto" alt="">
      </div> */}
        </div>
        {/* <a
          className="carousel-control-prev"
          href="https://taghash.co/jcb/?qc=JCBAC811FB4E62#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a> */}
        {/* <a
          className="carousel-control-next"
          href="https://taghash.co/jcb/?qc=JCBAC811FB4E62#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a> */}
      </div>
      {/* owl slider end */}
      {/* code start */}
      {/* <div class="container-fluid">
          <div class="row">
              <div class="home_banner1 w-100">
                  <div class="cashbackimg"><img src="assets/images/instant_cashback.png" class="img-fluid" alt=""></div>
                  <img src="assets/images/banner.jpg" class="img-fluid m-auto" alt="">
              </div>
          </div>              
      </div> */}
      {/* code end */}
    </>
  );
};
