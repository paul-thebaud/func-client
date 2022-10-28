import { Adapter } from '@/core/adapter/adapter';
import BaseConnection from '@/core/connection/baseConnection';
import BaseConverter from '@/core/converter/baseConverter';
import ModelsRegistry from '@/core/registry/modelsRegistry';
import TransformersRegistry from '@/core/registry/transformersRegistry';
import WeakRefsMapStore from '@/core/store/weakRefsMapStore';

type MakeConnectionOptions = {
  registerModels: (registry: ModelsRegistry) => unknown;
  registerTransforms: (registry: TransformersRegistry) => unknown;
};

export default function makeConnection(
  adapter: Adapter,
  options?: Partial<MakeConnectionOptions>,
) {
  const modelsRegistry = new ModelsRegistry();
  options?.registerModels?.(modelsRegistry);

  const transformsRegistry = new TransformersRegistry();
  options?.registerTransforms?.(transformsRegistry);

  const converter = new BaseConverter(transformsRegistry);
  const store = new WeakRefsMapStore(modelsRegistry);

  return new BaseConnection(
    adapter,
    converter,
    store,
  );
}
