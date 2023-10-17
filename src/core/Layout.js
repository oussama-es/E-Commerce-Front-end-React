import React from 'react';

const Layout = ({ title, description, className, children }) => {
  return (
    <div>
      <div className="jumbotron bg-info text-white mt-5">
        <h1 className="display-4">{title}</h1>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>
        {children}
      </div>
      <section className="container my-4   ">
        <h2 className="text-center">About Our E-commerce Website</h2>
        <p>
          Welcome to our world-renowned e-commerce website! We are committed to providing an exceptional online shopping experience. Our extensive range of high-quality products, from clothing to technology to home goods, is carefully curated to meet all your needs.
        </p>
        <p>
          Our dedicated team works tirelessly to bring you the best deals and promotions. Explore our diverse categories, discover our exclusive products, and shop with confidence.
        </p>
        <p>
          Thank you for trusting us with your online shopping needs. We're here to serve you!
        </p>
      </section>
    </div>
  );
};

export default Layout;
