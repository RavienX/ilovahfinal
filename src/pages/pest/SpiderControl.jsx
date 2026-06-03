import ServicePage from '../ServicePage';
import { pestPages } from '../../data/pest-pages';

export default function SpiderControl() {
  return <ServicePage variant="pest" {...pestPages['spider-control']} />;
}
