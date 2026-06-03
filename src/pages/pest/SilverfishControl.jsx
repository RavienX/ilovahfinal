import ServicePage from '../ServicePage';
import { pestPages } from '../../data/pest-pages';

export default function SilverfishControl() {
  return <ServicePage variant="pest" {...pestPages['silverfish-control']} />;
}
