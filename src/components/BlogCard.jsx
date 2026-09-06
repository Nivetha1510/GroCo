import { Link } from 'react-router-dom';
import { FaRegUser, FaRegCalendarAlt } from 'react-icons/fa';
import './BlogCard.css';

export default function BlogCard({ blog }) {
  return (
    <article className="blog-card">
      <img className="blog-card__img" src={blog.image} alt="" />
      <div className="blog-card__body">
        <div className="blog-card__meta">
          <span><FaRegUser /> {blog.author}</span>
          <span><FaRegCalendarAlt /> {blog.date}</span>
        </div>
        <h3 className="blog-card__title">{blog.title}</h3>
        <p className="blog-card__excerpt">{blog.excerpt}</p>
        <Link to={`/blog/${blog.id}`} className="btn-outline blog-card__btn">
          Read More
        </Link>
      </div>
    </article>
  );
}
