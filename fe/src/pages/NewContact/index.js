import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import ContactsService from '../../services/ContactsService';

export default function NewContact() {
  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.category,
      };

      const response = await ContactsService.createContact(contact);
      console.log(response);
    } catch (error) {
      alert('erro ao inserir');
    }
  }
  return (
    <>
      <PageHeader title="Novo Contato" />
      <ContactForm
        labelButton="Casdastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
}
