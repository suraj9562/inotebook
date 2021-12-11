import React from "react";

const About = () => {
  return (
    <div className="mt-5">
      <section className="about-section">
      <div className="container">
        <div className="row">
          <div className="content-column col-lg-6 col-md-12 col-sm-12 order-2">
            <div className="inner-column">
              <div className="sec-title">
                <span className="title">About iNotebook</span>
                <h2>Lorem, ipsum dolor<br />Lorem ipsum dolor sit amet</h2>
              </div>
              <div className="text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </div>
              <ul className="list-style-one">
                <li>Lorem Ipsum is simply dummy tex</li>
                <li>Consectetur adipisicing elit</li>
                <li>Sed do eiusmod tempor incididunt</li>
              </ul>
              <div className="btn-box">
                <a href="#" className="theme-btn btn-style-one">Contact Us</a>
              </div>
            </div>
          </div>

          <div className="image-column col-lg-6 col-md-12 col-sm-12">
            <div className="inner-column wow fadeInLeft">
              <figure className="image-1">
                <a href="#" className="lightbox-image" data-fancybox="images"
                  ><img src="https://i1.wp.com/www.penchalet.com/blog/wp-content/uploads/2016/06/Field-Notes-Byline-Reporters-Notebook-FNC31H.jpg?ssl=1" alt=""
                /></a>
              </figure>
              <figure className="image-2">
                <a href="#" className="lightbox-image" data-fancybox="images"
                  ><img className="rounded" src="https://i.pinimg.com/originals/59/18/5d/59185db60a45b4f8f2c1a23ac28323b5.jpg" alt=""
                /></a>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default About;

