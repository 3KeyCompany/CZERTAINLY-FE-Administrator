import { configureStore } from '@reduxjs/toolkit';
import { mount } from 'cypress/react18';
import { reducers } from 'ducks/reducers';
import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

Cypress.Commands.add('mount', (component, options = {}) => {
    // Use the default store if one is not provided
    const { ...mountOptions } = options;
    const reduxStore = configureStore({
        reducer: reducers,
        // enhancers: [enhancer],
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false, // disable immutability checks because of date => should be refactored and date should not be stored in state
            }),
        // preloadedState: initialState,
    });
    // expose store when run in Cypress
    if (window.Cypress) {
        window.store = reduxStore;
    }
    // const reduxStore = configure();
    const wrapped = (
        <React.Fragment>
            <Provider store={reduxStore}>
                <HashRouter>{component}</HashRouter>
            </Provider>
        </React.Fragment>
    );
    return mount(wrapped, mountOptions);
});

// Cypress.Commands.add("mount", mount);

Cypress.Commands.add('dataCy', (value) => {
    return cy.get(`[data-cy=${value}]`);
});
