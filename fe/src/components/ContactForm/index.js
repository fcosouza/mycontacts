import { useState } from 'react';
import PropTypes from 'prop-types';
import FormGroup from '../FormGroup';
import { Form, ButtonContainer } from './style';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';

import useErrors from '../../hooks/useErrors';

export default function ContactForm({ labelButton }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');

  const {
    setError, removeError, getErrorMessageByField, errors,
  } = useErrors();
  const isFormValid = (name && errors.length === 0);

  function handleNameChange(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: 'name', message: 'O campo nome é obrigatorio!' });
    } else {
      removeError('name');
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'E-mail inválido!' });
    } else {
      removeError('email');
    }
  }

  function handlePhoneChange(event) {
    setPhone(formatPhone(event.target.value));
  }

  return (
    <Form noValidate>
      <FormGroup error={getErrorMessageByField('name')}>
        <Input
          placeholder="Nome"
          value={name}
          onChange={handleNameChange}
          error={getErrorMessageByField('name')}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByField('email')}>
        <Input
          type="email"
          placeholder="E-mail"
          onChange={handleEmailChange}
          value={email}
          error={getErrorMessageByField('email')}
        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder="Telefone"
          onChange={handlePhoneChange}
          value={phone}
          maxLength="15"
        />
      </FormGroup>

      <FormGroup>
        <Select
          placeholder="Categoria"
          onChange={(event) => setCategory(event.target.value)}
          value={category}
        >
          <option value=""> ---- </option>
          <option value="instagram">Intagram</option>
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid}>
          { labelButton }
        </Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  labelButton: PropTypes.string.isRequired,
};
