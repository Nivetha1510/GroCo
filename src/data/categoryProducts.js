/* ------------------------------------------------------------------
   Category grids (frames 43, 45, 46, 47, 48).
------------------------------------------------------------------- */
import milk from '../assets/images/item-milk.jpg';
import garlic from '../assets/images/item-garlic.jpg';
import potato from '../assets/images/item-potato.jpg';
import cheese from '../assets/images/item-cheese.jpg';
import chickenWhole from '../assets/images/item-chicken-whole.jpg';
import tomato from '../assets/images/item-tomato.jpg';
import greenChilli from '../assets/images/item-green-chilli.jpg';
import okra from '../assets/images/item-okra.jpg';
import bitterGourd from '../assets/images/item-bitter-gourd.jpg';
import broccoli from '../assets/images/item-broccoli.jpg';
import rawBanana from '../assets/images/item-raw-banana.jpg';
import cabbage from '../assets/images/item-cabbage.jpg';
import grapes from '../assets/images/item-grapes.jpg';
import jackfruit from '../assets/images/item-jackfruit.jpg';
import redApple from '../assets/images/item-red-apple.jpg';
import banana from '../assets/images/item-banana.jpg';
import nestle from '../assets/images/item-nestle-everyday.jpg';
import camelMilk from '../assets/images/item-camel-milk.jpg';
import ghee from '../assets/images/item-ghee.jpg';
import curd from '../assets/images/item-curd.jpg';
import paneer from '../assets/images/item-paneer.jpg';
import yogurt from '../assets/images/item-yogurt.jpg';
import butter from '../assets/images/item-butter.jpg';
import mutton from '../assets/images/item-mutton.jpg';
import fish from '../assets/images/item-fish.jpg';
import crab from '../assets/images/item-crab.jpg';
import squid from '../assets/images/item-squid.jpg';
import prawns from '../assets/images/item-prawns.jpg';
import drumstick from '../assets/images/item-chicken-drumstick.jpg';
import breast from '../assets/images/item-chicken-breast.jpg';

import freshOrange from '../assets/images/product-fresh-orange.jpg';
import freshCarrot from '../assets/images/product-fresh-carrot.jpg';
import freshWatermelon from '../assets/images/product-fresh-watermelon.jpg';
import freshBrinjal from '../assets/images/product-fresh-brinjal.jpg';
import freshMango from '../assets/images/product-fresh-mango.jpg';
import freshPapaya from '../assets/images/product-fresh-papaya.jpg';
import freshPineapple from '../assets/images/product-fresh-pineapple.jpg';
import freshMeet from '../assets/images/product-fresh-meet.jpg';

const SUBTITLE = {
  product: 'Dairy Product',
  vegetable: 'Vegetable',
  fruit: 'Fruit',
  meat: 'Meat',
};

const card = (id, cartName, image, reviewType) => ({
  id,
  cartName,
  image,
  price: 8.99,
  name: cartName,
  subtitle: SUBTITLE[reviewType],
  rating: 4,
  review: R[reviewType],
});

const R = {
  product: 'The product was so fresh Its receive perfectly',
  vegetable: 'The  Vegetable was so fresh Its receive perfectly',
  fruit: 'The fruits was so freas Its receive perfectly',
  meat: 'The meat wash so fresh Its receive perfectly',
};

/* Default grid — frame 43 */
export const defaultGrid = [
  card('c-milk', 'Milk', milk, 'product'),
  card('c-orange', 'Orange', freshOrange, 'fruit'),
  card('c-garlic', 'Garlic', garlic, 'vegetable'),
  card('c-meat', 'Meat', freshMeet, 'meat'),
  card('c-potato', 'Potato', potato, 'vegetable'),
  card('c-watermelon', 'Watermelon', freshWatermelon, 'fruit'),
  card('c-carrot', 'Carrot', freshCarrot, 'vegetable'),
  card('c-cheese', 'Cheese', cheese, 'product'),
  card('c-chicken', 'Chicken', chickenWhole, 'meat'),
];

/* Vegetables — frame 45 */
export const vegetables = [
  card('v-tomato', 'Tomato', tomato, 'vegetable'),
  card('v-green-chilli', 'Green Chilli', greenChilli, 'vegetable'),
  card('v-okra', 'Okra', okra, 'vegetable'),
  card('v-bitter-gourd', 'Bitter Gourd', bitterGourd, 'vegetable'),
  card('v-broccoli', 'Broccoli', broccoli, 'vegetable'),
  card('v-raw-banana', 'Raw Banana', rawBanana, 'vegetable'),
  card('v-carrot', 'Carrot', freshCarrot, 'vegetable'),
  card('v-cabbage', 'Cabbage', cabbage, 'vegetable'),
  card('v-brinjal', 'Brinjal', freshBrinjal, 'vegetable'),
];

/* Fruits — frame 46 */
export const fruits = [
  card('f-grapes', 'Grapes', grapes, 'fruit'),
  card('f-jackfruit', 'Jackfruit', jackfruit, 'fruit'),
  card('f-red-apple', 'Red Apple', redApple, 'fruit'),
  card('f-banana', 'Banana', banana, 'fruit'),
  card('f-orange', 'Orange', freshOrange, 'fruit'),
  card('f-mango', 'Mango', freshMango, 'fruit'),
  card('f-papaya', 'Papaya', freshPapaya, 'fruit'),
  card('f-pineapple', 'Pineapple', freshPineapple, 'fruit'),
  card('f-watermelon', 'Watermelon', freshWatermelon, 'fruit'),
];

/* Dairy Products — frame 47 */
export const dairy = [
  card('d-nestle', 'Nestle EveryDay', nestle, 'product'),
  card('d-camel-milk', 'Camel Milk', camelMilk, 'product'),
  card('d-ghee', 'Ghee', ghee, 'product'),
  card('d-cheese', 'Cheese', cheese, 'product'),
  card('d-curd', 'Curd', curd, 'product'),
  card('d-paneer', 'Paneer', paneer, 'product'),
  card('d-yogurt', 'Yogurt', yogurt, 'product'),
  card('d-milk', 'Milk', milk, 'product'),
  card('d-butter', 'Butter', butter, 'product'),
];

/* Fresh Meats — frame 48 */
export const meats = [
  card('m-meat', 'Meat', freshMeet, 'meat'),
  card('m-mutton', 'Mutton', mutton, 'meat'),
  card('m-chicken-whole', 'Whole Chicken', chickenWhole, 'meat'),
  card('m-fish', 'Fish', fish, 'meat'),
  card('m-crab', 'Crab', crab, 'meat'),
  card('m-squid', 'Squid', squid, 'meat'),
  card('m-prawns', 'Prawns', prawns, 'meat'),
  card('m-drumstick', 'Chicken Drumstick', drumstick, 'meat'),
  card('m-breast', 'Chicken Breast', breast, 'meat'),
];

export const categoryGrids = {
  default: defaultGrid,
  vegetables,
  fruits,
  'dairy-products': dairy,
  'fresh-meats': meats,
};

export const allCategoryProducts = [
  ...defaultGrid, ...vegetables, ...fruits, ...dairy, ...meats,
];

export const getCategoryProductById = (id) =>
  allCategoryProducts.find((p) => p.id === id);
