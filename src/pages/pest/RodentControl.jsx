import ServicePage from '../ServicePage';
import { pestPages } from '../../data/pest-pages';

export default function RodentControl() {
  return <ServicePage variant="pest" {...pestPages['rodent-control']} />;
}
