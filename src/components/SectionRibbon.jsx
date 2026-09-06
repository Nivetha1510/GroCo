import './SectionRibbon.css';

/* The green word + orange notched banner used above every home section.
   Polygon measured from the frames: 363x100 box, notch depth 39px,
   apex at 55% of the height. */
export default function SectionRibbon({ lead, label, id }) {
  return (
    <div className="ribbon" id={id}>
      <span className="ribbon__lead">{lead}</span>
      <span className="ribbon__banner">{label}</span>
    </div>
  );
}
