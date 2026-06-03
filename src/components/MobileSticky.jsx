import { CONTACT } from '../data/business';
import './MobileSticky.css';

export default function MobileSticky() {
  return (
    <div className="mobile-sticky">
      <a href={`tel:${CONTACT.phoneTel}`} className="ms-btn ms-call">📞 Call now</a>
      <a href="#quote" className="ms-btn ms-quote">Get free quote</a>
    </div>
  );
}
