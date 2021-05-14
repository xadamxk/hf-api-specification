import SwaggerUIBundle from 'swagger-ui';
import 'swagger-ui/dist/swagger-ui.css';

SwaggerUIBundle({
  spec: require('../../dist/openapi.json'),
  dom_id: '#swagger',
});
