import { useParams, Link } from 'react-router-dom';
import { FaRegUser, FaRegCalendarAlt } from 'react-icons/fa';
import { blogs, features } from '../data/content';
import './BlogPost.css';

/* No article frame exists in the prototype. This renders the card's own
   content at page scale so "Read More" resolves somewhere sensible. */
export default function BlogPost() {
  const { id } = useParams();
  const post =
    blogs.find((b) => String(b.id) === id) ||
    features.find((f) => f.id === id);

  if (!post) {
    return (
      <div className="post">
        <h1 className="page-title">Post not found</h1>
        <p className="post__back">
          <Link to="/">Back to Home</Link>
        </p>
      </div>
    );
  }

  const title = post.title;
  const body = post.excerpt || post.text;

  return (
    <article className="post">
      <h1 className="post__title">{title}</h1>

      {post.author && (
        <div className="post__meta">
          <span><FaRegUser /> {post.author}</span>
          <span><FaRegCalendarAlt /> {post.date}</span>
        </div>
      )}

      <img className="post__img" src={post.image} alt="" />
      <p className="post__body">{body}</p>

      <p className="post__back">
        <Link to="/">← Back to Home</Link>
      </p>
    </article>
  );
}
