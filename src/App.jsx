import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { protectedRoutes, publicRoutes } from './routes/route';
import SuspenseLoader from './components/SuspenseLoader';
import ProtectedLayout from './layouts/ProtectedLayout';
const PublicLayout = lazy(() => import('./layouts/PublicLayout'));

function App() {
  return (
    <React.Fragment>
      <Toaster containerClassName="toaster-container" />
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route element={<PublicLayout/>}>
          {
            publicRoutes.map(({ path, component: Component }, idx) => {
              return (
                <Route
                  key={`public-route-${idx}`}
                  path={path}
                  element={
                    <Suspense fallback={<SuspenseLoader />}>
                      <Component />
                    </Suspense>
                  }
                />
              )
            })
          }
        </Route>
        {/* PRIVATE ROUTES */}
        <Route element={<ProtectedLayout/>}>
        {
            protectedRoutes.map(({ path, component: Component, forms }, idx) => {
              return (
                <>
                  <Route
                    key={`protected-route-${idx}`}
                    path={path}
                    element={
                      <Suspense fallback={<SuspenseLoader />}>
                        <Component />
                      </Suspense>
                    }
                  />
                  {
                    forms.map(({path, component: Component}, idx)=>(
                    <Route
                      key={`children-protected-route-${idx}`}
                      path={path}
                      element={
                        <Suspense fallback={<SuspenseLoader />}>
                          <Component />
                        </Suspense>
                      }
                    />))
                  }
                </>
              )
            })
          }
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;