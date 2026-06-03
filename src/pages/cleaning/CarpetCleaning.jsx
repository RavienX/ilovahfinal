import ServicePage from '../ServicePage';
import { cleaningPages } from '../../data/cleaning-pages';

export default function CarpetCleaning() {
  return <ServicePage variant="cleaning" {...cleaningPages['carpet-cleaning']} />;
}
