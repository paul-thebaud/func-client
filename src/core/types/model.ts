import type Model from '@/core/model';
import { Registry } from '@/core/registry/registry';
import { RecordType } from '@/core/types/record';
import { Constructor } from '@/core/types/utilities/constructor';

export type MixableModel = abstract new(...args: any[]) => Model;

export type ModelClass = Constructor<Model> & typeof Model;

export type ModelsRegistry = Registry<RecordType, ModelClass>;
