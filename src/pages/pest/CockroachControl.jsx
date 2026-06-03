import ServicePage from '../ServicePage';
import { pestPages } from '../../data/pest-pages';

export default function CockroachControl() {
  return <ServicePage variant="pest" {...pestPages['cockroach-control']} />;
}
