import SwaggerUI from 'swagger-ui';
import 'swagger-ui/dist/swagger-ui.css';

SwaggerUI({
  spec: require('../dist/openapi.json'),
  dom_id: '#swagger',
});
