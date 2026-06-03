import ServicePage from '../ServicePage';
import { pestPages } from '../../data/pest-pages';

export default function AntControl() {
  return <ServicePage variant="pest" {...pestPages['ant-control']} />;
}
