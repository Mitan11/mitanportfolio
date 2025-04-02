// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://33c4ebd7f47497d373912b9ff2eaaf52@o4509084696051712.ingest.us.sentry.io/4509084698476544",

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});