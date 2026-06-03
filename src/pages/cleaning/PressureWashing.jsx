import ServicePage from '../ServicePage';
import { cleaningPages } from '../../data/cleaning-pages';

export default function PressureWashing() {
  return <ServicePage variant="cleaning" {...cleaningPages['pressure-washing']} />;
}
