import ServicePage from '../ServicePage';
import { pestPages } from '../../data/pest-pages';

export default function EndOfLeasePest() {
  return <ServicePage variant="pest" {...pestPages['end-of-lease-pest']} />;
}
