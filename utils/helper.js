const saveInput = (dataInput, dataDatabase) => {
  for (let index = 0; index < Object.keys(dataDatabase).length; index++) {
    let keyObject = Object.keys(dataDatabase)[index];
    if (
      dataInput[keyObject] === undefined ||
      dataInput[keyObject] === null ||
      dataInput[keyObject] === ''
    ) {
      dataInput[keyObject] = dataDatabase[keyObject];
    }
  }

  return dataInput;
};

module.exports = { saveInput };
