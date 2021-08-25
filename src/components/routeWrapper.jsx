import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

function RouteWrapper({
                        component: Component,
                        layout: Layout,
                        ...rest
                      }) {
  return (
    <Route
      /* eslint react/jsx-props-no-spreading: */
      {...rest}
      render={(props) => (
        <Layout {...props}>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  component: PropTypes.elementType.isRequired,
  layout: PropTypes.elementType.isRequired,
};

export default RouteWrapper;