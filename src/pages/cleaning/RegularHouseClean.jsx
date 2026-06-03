import ServicePage from '../ServicePage';
import { cleaningPages } from '../../data/cleaning-pages';

export default function RegularHouseClean() {
  return <ServicePage variant="cleaning" {...cleaningPages['regular-house-clean']} />;
}
