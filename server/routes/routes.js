
import { onPageLoad } from 'meteor/server-render';
import { WebApp } from 'meteor/webapp';
import { onPageLoad } from 'meteor/server-render';
import React from 'react';
import { renderToString } from 'react-dom/server';
import CategoriesView from '/imports/ui/views/Category/CategoriesView';

WebApp.connectHandlers.use('/', (req, res) => {
    onPageLoad(sink => {
      const app = renderToString(<CategoriesView />);
      sink.renderIntoElementById('app', app);
    })(req, res);
  });