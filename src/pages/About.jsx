import { aboutParagraphs } from '../data/content';
import aboutImg from '../assets/images/about-cart.jpg';
import './About.css';

export default function About() {
  return (
    <div className="about">
      <h1 className="about__title">About Us</h1>
      <img className="about__img" src={aboutImg} alt="" />
      <div className="about__body">
        {aboutParagraphs.map((p, i) => (
          <p className="about__para" key={i}>{p}</p>
        ))}
      </div>
    </div>
  );
}
