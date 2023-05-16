import { useState } from 'react';

export default function useErrors() {
  const [errors, setErrors] = useState([]);

  function setError({ field, message }) {
    const errorAlreadyEmail = errors.find((error) => error.field === 'email');

    if (errorAlreadyEmail) {
      return;
    }

    setErrors((prevState) => [
      ...prevState,
      { field, message },
    ]);
  }

  function removeError(fieldName) {
    setErrors((prevState) => prevState.filter(
      (error) => error.field !== fieldName,
    ));
  }

  function getErrorMessageByField(fielName) {
    return errors.find((error) => error.field === fielName)?.message;
  }

  return {
    setError, removeError, getErrorMessageByField, errors,
  };
}
