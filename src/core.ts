import FuncModelError from '@/core/errors/funcModelError';
import isModel from '@/core/model/isModel';
import isModelInstance from '@/core/model/isModelInstance';
import makeModel from '@/core/model/makeModel';
import attr from '@/core/model/props/attr';
import hasMany from '@/core/model/props/hasMany';
import hasOne from '@/core/model/props/hasOne';
import makeStore from '@/core/store/makeStore';

export * from '@/core/action/types';
export * from '@/core/model/types';
export * from '@/core/store/types';
export * from '@/core/utilities/types';

export * from '@/core/action';

export {
  FuncModelError,
  attr,
  hasMany,
  hasOne,
  isModel,
  isModelInstance,
  makeModel,
  makeStore,
};
