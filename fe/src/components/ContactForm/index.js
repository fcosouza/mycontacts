import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FormGroup from '../FormGroup';
import { Form, ButtonContainer } from './style';
import Input from '../Input';
import Select from '../Select';
import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';

import useErrors from '../../hooks/useErrors';
import CategoriesService from '../../services/CategoriesService';
import Button from '../Button';

export default function ContactForm({ labelButton, onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await CategoriesService.listCategories();
        setCategories(response);
      } catch {} finally {
        setIsLoadingCategories(false);
      }
    }

    loadCategories();
  }, []);

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

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);

    await onSubmit({
      name, email, phone, category,
    });

    setIsSubmitting(false);
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByField('name')}>
        <Input
          placeholder="Nome"
          value={name}
          onChange={handleNameChange}
          error={getErrorMessageByField('name')}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByField('email')}>
        <Input
          type="email"
          placeholder="E-mail"
          onChange={handleEmailChange}
          value={email}
          error={getErrorMessageByField('email')}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder="Telefone"
          onChange={handlePhoneChange}
          value={phone}
          maxLength="15"
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup isLoading={isLoadingCategories}>
        <Select
          placeholder="Categoria"
          onChange={(event) => setCategory(event.target.value)}
          value={category}
          disabled={isLoadingCategories || isSubmitting}
        >
          <option value=""> -- Categorias -- </option>
          {categories.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button
          type="submit"
          disabled={!isFormValid}
          isLoading={isSubmitting}
        >
          { labelButton }
        </Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  labelButton: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
