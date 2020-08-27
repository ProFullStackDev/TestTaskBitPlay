import * as types from '../../types';
export const handleLoader = loading => {
  console.log (loading, 'Loading...');
  return {
    type: types.LOADING,
    payload: loading,
  };
};
