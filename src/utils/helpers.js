// Get Data As An Array
/* Object.entries --> return an array of arrays,
                        each array contain 2 value [objectKey,keyValue] */
/* Map on these arrays to get each array value and store these values in new object,
      All these new objects will store in array because map return array */
export const getDataInArray = obj => {
  const newArr = Object.entries(obj).map(([code, name]) => ({
    id: code,
    label: name,
  }));
  return newArr;
};
