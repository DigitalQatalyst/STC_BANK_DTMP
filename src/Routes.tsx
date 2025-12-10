import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";

import EJPOperationsDashboard from './modules/service-delivery-overview';
import OperationsControlStatusPage from './modules/service-delivery-overview/OperationsControlStatus';

const Routes = (): React.JSX.Element => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Service Delivery overview */}
        <Route path="/" element={<EJPOperationsDashboard />} />
        <Route path="/service-delivery-overview" element={<EJPOperationsDashboard />} />
        {/* Operations Control Status */}
        <Route path="/operations-control-status" element={<OperationsControlStatusPage />} />
        <Route path="*" element={<EJPOperationsDashboard />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
