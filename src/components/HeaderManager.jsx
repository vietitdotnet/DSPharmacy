import PropTypes from 'prop-types'
const HeaderManager = ({ children }) => {
    return (
      <header>
        {children}
      </header>
    );
}

HeaderManager.propTypes = {
  children: PropTypes,
};

export default HeaderManager;