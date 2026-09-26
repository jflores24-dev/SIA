import app from "./app.js";

import { startAlertScheduler } from "./schedulers/alert.scheduler.js";

const port = 3000;

app.listen(port, () => {
  console.log(`Server listen on port ${port}`);

  startAlertScheduler();
});
