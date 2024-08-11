import PropTypes from 'prop-types';
import { Suspense } from 'react';

import Loading from '@components/Loading';
/**
 * Lazily load the mentioned component which resides in the page directory
 * This method will be used in routes so that the files are loaded only
 * When users are on that route
 */
const LazyLoadRoutes = ({ children }) => {
  // Wrapping around the suspense component is mandatory
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

LazyLoadRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LazyLoadRoutes;
