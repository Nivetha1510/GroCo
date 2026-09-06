/* ------------------------------------------------------------------
   Static content lifted verbatim from the supplied frames.
------------------------------------------------------------------- */
import featOrganic from '../assets/images/feature-fresh-organic.jpg';
import featDelivery from '../assets/images/feature-free-delivery.jpg';
import featPayment from '../assets/images/feature-easy-payment.jpg';
import catVegetables from '../assets/images/category-fresh-vegetables.jpg';
import catDairy from '../assets/images/category-dairy-products.jpg';
import catFruits from '../assets/images/category-fresh-fruits.jpg';
import catMeat from '../assets/images/product-fresh-meet.jpg';
import avatar1 from '../assets/images/avatar-1.jpg';
import avatar2 from '../assets/images/avatar-2.jpg';
import avatar3 from '../assets/images/avatar-3.jpg';
import blog1 from '../assets/images/blog-1.jpg';
import blog2 from '../assets/images/blog-2.jpg';
import blog3 from '../assets/images/blog-3.jpg';

export const features = [
  {
    id: 'fresh-and-organic',
    title: 'Fresh And Organic',
    text: 'Lorem ipsum Dolor,sit Amet\nConsectetur Adipisicing',
    image: featOrganic,
  },
  {
    id: 'free-delivery',
    title: 'Free Delivery',
    text: 'Lorem ipsum Dolor,sit Amet Consectetur\nAdipisicing  Elite',
    image: featDelivery,
  },
  {
    id: 'easy-payment',
    title: 'Easy Payment',
    text: 'Lorem ipsum Dolor,sit Amet Consectetur\nAdipisicing  Elite',
    image: featPayment,
  },
];

export const categories = [
  { id: 'vegetables',    title: 'Fresh  Vegetables', offer: 'Upto 45% Off', image: catVegetables },
  { id: 'dairy-products', title: 'Dairy Products',   offer: 'Upto 45% Off', image: catDairy },
  { id: 'fruits',        title: 'Fresh  Fruits',     offer: 'Upto 45% Off', image: catFruits },
  { id: 'fresh-meats',   title: 'Fresh  Meat',       offer: 'Upto 45% Off', image: catMeat },
];

/* Side panel on the categories screens (frames 01, 43–48) */
export const categoryPanelItems = [
  { id: 'vegetables',     label: 'Vegetables' },
  { id: 'fruits',         label: 'Fruits' },
  { id: 'dairy-products', label: 'Dairy Products' },
  { id: 'fresh-meats',    label: 'Fresh Meats' },
];

const REVIEW_TEXT =
  'Lorem ipsum Dolor,sit Amet\nConsectetur Adipisicing  Elite\nEarum Aials Volupats Labore\nEst.Dolorum Tenetur!';

export const reviews = [
  { id: 1, name: 'John Deo', text: REVIEW_TEXT, avatar: avatar1, rating: 5 },
  { id: 2, name: 'John Deo', text: REVIEW_TEXT, avatar: avatar2, rating: 5 },
  { id: 3, name: 'John Deo', text: REVIEW_TEXT, avatar: avatar3, rating: 5 },
];

export const blogs = [
  {
    id: 1,
    title: 'Fresh  And Organic\nvegitables And Fruits',
    author: 'By Admin',
    date: '12th Jan,2026',
    excerpt: 'Lorem ipsum Dolor,sit Amet Consectetur\nAdipisicing  Elite',
    image: blog1,
  },
  {
    id: 2,
    title: 'Fresh  And Organic\nvegitables And Fruits',
    author: 'By Admin',
    date: '5th May,2026',
    excerpt: 'Lorem ipsum Dolor,sit Amet Consectetur\nAdipisicing  Elite',
    image: blog2,
  },
  {
    id: 3,
    title: 'Fresh  And Organic\nvegitables And Fruits',
    author: 'By Admin',
    date: '1st Sep,2026',
    excerpt: 'Lorem ipsum Dolor,sit Amet Consectetur\nAdipisicing  Elite',
    image: blog3,
  },
];

export const footerContent = {
  brand: 'GroCo',
  description:
    'Lorem ipsum Dolor,sit Amet\nConsectetur Adipisicing  Elite\nEarum Aials Volupats Labore\nEst.Dolorum Tenetur!',
  contact: [
    { type: 'phone', value: '+123-9887-0987' },
    { type: 'phone', value: '+123-9887-0987' },
    { type: 'mail', value: 'nivetha@gmail.com' },
    { type: 'mail', value: 'Mumbai ,India-9989876' },
  ],
  quickLinks: [
    { label: 'Home',       to: '/' },
    { label: 'Features',   to: '/#features' },
    { label: 'Products',   to: '/#products' },
    { label: 'Categories', to: '/categories' },
    { label: 'Review',     to: '/#review' },
    { label: 'Blog',       to: '/#blog' },
  ],
};

export const aboutParagraphs = [
  'We are a modern fashion brand focused on creating stylish, comfortable, and high-quality clothing for everyday life. Our goal is to offer designs that are both trendy and timeless, giving customers confidence in every outfit they wear.',
  'We believe in using good materials, sustainable practices, and thoughtful craftsmanship. Every piece we create is made with attention to detail and a passion for fashion.',
  'Our team brings together creativity, experience, and fresh ideas to deliver the best for our customers. We’re committed to offering a smooth shopping experience and products that inspire your personal style.',
  'Thank you for being a part of our journey. Together, we continue to shape a better and more stylish future.',
];

export const getProductDetailsText = (name) =>
  `Our ${name} is handpicked and quality-checked for freshness before delivery. Stored and packed with care so it reaches you in the best condition.`;

export const SHIPPING_FEE = 5.0;
