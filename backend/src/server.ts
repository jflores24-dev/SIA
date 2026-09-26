import app from "./app.js";

import { startIrrigationReportScheduler } from "./reports/irrigation-report-scheduler.js";

const port = 3000;

app.listen(port, () => {
  console.log(`Server listen on port ${port}`);

  //startIrrigationReportScheduler();
});
