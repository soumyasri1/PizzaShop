import React, { useState, useEffect ,Suspense} from 'react';
import Footer from './Footer'
import '../componentStyles/Home.css';
const LazyBannerImage = React.lazy(() => import('./LazyBanner'));
function HomePage({ isLoggedIn }) {
  const [pizzas, setPizzas] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://mocki.io/v1/40ac8592-82a7-4a0c-ad55-0c7ca1c107c0');
       
        if (!response.ok) {
          throw new Error('Failed to fetch pizza data');
        }
        const data = await response.json();
        setPizzas(data);
      } catch (error) {
        console.error('Error fetching pizza data:', error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <>
    <div className="container">
      {!isLoggedIn ? (
        
        <div className="banner">
            <Suspense fallback={<div>Loading...</div>}>
              <LazyBannerImage />
            </Suspense>
        </div>
        

 ): (<div id="pizzmain">
      <div className="pizza-container">
        {pizzas.map(pizza => (
          <div key={pizza.id} className="pizza-card">
            <img src={pizza.image} alt={pizza.name} className="pizza-image" />
            <h2 className="pizza-name">{pizza.name}</h2>
            <p className="pizza-price">${pizza.price}</p>
            <p className="pizza-rating">Rating: {pizza.rating}</p>
            <ul className="pizza-ingredients">
              {pizza.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      </div>
      )}
      
    </div>
    <Footer />
   </>
  );
}

export default HomePage;
