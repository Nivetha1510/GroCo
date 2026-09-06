/* ------------------------------------------------------------------
   Catalog for the "Our products" cards.
   Names and price ranges are reproduced exactly as they appear on the
   supplied frames (including the "Fresh  Meet" spelling and the double
   spaces used in the design).
------------------------------------------------------------------- */
import meet from '../assets/images/product-fresh-meet.jpg';
import springOnion from '../assets/images/product-fresh-spring-onion.jpg';
import lemon from '../assets/images/product-fresh-lemon.jpg';
import carrot from '../assets/images/product-fresh-carrot.jpg';
import onion from '../assets/images/product-fresh-onion.jpg';
import orange from '../assets/images/product-fresh-orange.jpg';
import greenApple from '../assets/images/product-fresh-green-apple.jpg';
import watermelon from '../assets/images/product-fresh-watermelon.jpg';
import brinjal from '../assets/images/product-fresh-brinjal.jpg';
import mango from '../assets/images/product-fresh-mango.jpg';
import papaya from '../assets/images/product-fresh-papaya.jpg';
import pineapple from '../assets/images/product-fresh-pineapple.jpg';

const PRICE_RANGE = '$4.99- $10.99';

export const products = [
  { id: 'fresh-meet',         name: 'Meet',         cartName: 'Meet',         category: 'meats',      image: meet },
  { id: 'fresh-spring-onion', name: 'Spring Onion', cartName: 'Spring Onion', category: 'vegetables', image: springOnion },
  { id: 'fresh-lemon',        name: 'Lemon',        cartName: 'Lemon',        category: 'vegetables', image: lemon },
  { id: 'fresh-carrot',       name: 'Carrot',       cartName: 'Carrot',       category: 'vegetables', image: carrot },
  { id: 'fresh-onion',        name: 'Onion',        cartName: 'Onion',        category: 'vegetables', image: onion },
  { id: 'fresh-orange',       name: 'Orange',       cartName: 'Orange',       category: 'fruits',     image: orange },
  { id: 'fresh-green-apple',  name: 'Green Apple',  cartName: 'Green Apple',  category: 'fruits',     image: greenApple },
  { id: 'fresh-watermelon',   name: 'Watermelon',   cartName: 'Watermelon',   category: 'fruits',     image: watermelon },
  { id: 'fresh-brinjal',      name: 'Brinjal',      cartName: 'Brinjal',      category: 'vegetables', image: brinjal },
  { id: 'fresh-mango',        name: 'Mango',        cartName: 'Mango',        category: 'fruits',     image: mango },
  { id: 'fresh-papaya',       name: 'Papaya',       cartName: 'Papaya',       category: 'fruits',     image: papaya },
  { id: 'fresh-pineapple',    name: 'Pineapple',    cartName: 'Pineapple',    category: 'fruits',     image: pineapple },
].map((p) => ({ ...p, price: 4.99, priceRange: PRICE_RANGE, rating: 4.5 }));

/* The home page shows these six, in this order (frame 40). */
export const homeProducts = [
  'fresh-onion',
  'fresh-orange',
  'fresh-carrot',
  'fresh-green-apple',
  'fresh-watermelon',
  'fresh-brinjal',
].map((id) => products.find((p) => p.id === id));

export const getProductById = (id) => products.find((p) => p.id === id);
