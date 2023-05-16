import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import { Container, Overlay, Footer } from './style';
import Button from '../Button';

export default function Modal({ danger }) {
  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>Titulo do modal</h1>
        <p>Corpo do modal</p>
        <Footer>
          <button type="button" className="cancel-button">Cancel</button>
          <Button type="button" danger={danger}>Confirm</Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById('root-modal'),
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
};

Modal.defaultProps = {
  danger: false,
};
