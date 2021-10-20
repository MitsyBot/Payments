const appconfig = require('./backend/utils/config/app.config.json')

const Routes = require('./backend/routes')
const FrontendRoutes = require('./frontend/routes')

const express = require("express");
const app = express();

app.use('/', Routes);
app.use('/', FrontendRoutes);
app.use(express.static("public"));

app.listen(appconfig.port, () => {
  console.info(`[MOTHERLODE] Servidor iniciado na porta ${appconfig.port}`);
});

