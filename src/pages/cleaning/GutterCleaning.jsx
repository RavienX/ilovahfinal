import ServicePage from '../ServicePage';
import { cleaningPages } from '../../data/cleaning-pages';

export default function GutterCleaning() {
  return <ServicePage variant="cleaning" {...cleaningPages['gutter-cleaning']} />;
}
