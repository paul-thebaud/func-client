import Action from '@/core/action/action';
import method from '@/core/action/changers/action/method';

export default function makeAction() {
  return new Action({}).use(method('GET'));
}
