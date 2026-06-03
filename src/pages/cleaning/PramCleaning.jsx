import ServicePage from '../ServicePage';
import { cleaningPages } from '../../data/cleaning-pages';

export default function PramCleaning() {
  return <ServicePage variant="cleaning" {...cleaningPages['pram-cleaning']} />;
}
