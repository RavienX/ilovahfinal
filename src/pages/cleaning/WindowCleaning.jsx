import ServicePage from '../ServicePage';
import { cleaningPages } from '../../data/cleaning-pages';

export default function WindowCleaning() {
  return <ServicePage variant="cleaning" {...cleaningPages['window-cleaning']} />;
}
