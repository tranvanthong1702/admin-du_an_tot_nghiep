/**
 * Entry application component used to compose providers and render Routes.
 * */

import PropTypes from 'prop-types'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { Routes } from './Routes'
import { I18nProvider } from '../_metronic/i18n'
import { LayoutSplashScreen, MaterialThemeProvider } from '../_metronic/layout'
import CustomerListPage from './modules/Customer/pages/CustomerList.page'

function App({ store, persistor, basename }) {
  function handleFiltersChange(newFilters){
    console.log('new',newFilters)
  }
  return (
    
    /* Provide Redux store */
    <Provider store={store}>
      {/* Asynchronously persist redux stores and show `SplashScreen` while it's loading. */}
      <PersistGate persistor={persistor} loading={<LayoutSplashScreen />}>
        {/* Add high level `Suspense` in case if was not handled inside the React tree. */}
        <React.Suspense fallback={<LayoutSplashScreen />}>
          {/* Override `basename` (e.g: `homepage` in `package.json`) */}
          <BrowserRouter basename={basename}>
            {/*This library only returns the location that has been active before the recent location change in the current window lifetime.*/}
            <MaterialThemeProvider>
              {/* Provide `react-intl` context synchronized with Redux state.  */}
              <I18nProvider>
              
                {/* Render routes with provided `Layout`. */}
                <Routes />
              </I18nProvider>
            </MaterialThemeProvider>
          </BrowserRouter>
        </React.Suspense>
      </PersistGate>
    </Provider>
  )
}

App.propTypes = {
  store: PropTypes.object.isRequired,
  persistor: PropTypes.object.isRequired,
  basename: PropTypes.string.isRequired
}

export default App
