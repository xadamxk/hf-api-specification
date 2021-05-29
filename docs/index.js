import SwaggerUI from 'swagger-ui';
import 'swagger-ui/dist/swagger-ui.css';

SwaggerUI({
  spec: require('./openapi.json'),
  dom_id: '#swagger',
  configUrl: "./swagger-config.yaml"
});
