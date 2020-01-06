import errorHandler from "errorhandler";

import app from "./app";

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

const server = app.listen(process.env.PORT || 5000, () => {
  console.log("App is running at 5000 in");
  console.log("  Press CTRL-C to stop\n");
});

export default server;