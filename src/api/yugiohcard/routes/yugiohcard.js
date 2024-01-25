"use strict";

/**
 * yugiohcard router
 */

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/custom",
      handler: "yugiohcard.find",
      config: { auth: false },
    },
  ],
};
