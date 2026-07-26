import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import serverlessExpress from 'serverless-http';
import { Handler, Context, Callback } from 'aws-lambda';

let server: any;

async function bootstrap(): Promise<any> {
  const app = await NestFactory.create(AppModule);
  // Enable CORS so the frontend can hit it
  app.enableCors();
  
  // Netlify exposes functions at /.netlify/functions/[filename]
  // Since our function file is api.js, the prefix is /.netlify/functions/api
  app.setGlobalPrefix('.netlify/functions/api');
  
  await app.init();
  
  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress(expressApp);
}

export const handler = async (
  event: any,
  context: Context
) => {
  server = server ?? (await bootstrap());
  return server(event, context);
};
