
import PropTypes from 'prop-types'
const Header = ({ children }) => {
    return (
      <header>
        {children}
      </header>
    );
}

Header.propTypes = {
  children: PropTypes,
};

export default Header;