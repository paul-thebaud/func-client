import { Dictionary } from '@/utilities';

export default function paramsSerializer(params: Dictionary<any>) {
  return new URLSearchParams(params).toString() || undefined;
}
