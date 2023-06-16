import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay } from './style';
import Spinner from '../Spinner';

export default function Loader({ isLoading }) {
  if (!isLoading) {
    return null;
  }

  return ReactDOM.createPortal(
    <Overlay>
      <Spinner size={90} />
    </Overlay>,
    document.getElementById('root-loader'),
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
