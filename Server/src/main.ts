import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:5173', // libera seu front-end
    credentials: true,
  });

  // 📌 Configuração da Documentação do Swagger
  const config = new DocumentBuilder()
    .setTitle('TaskFlow API')
    .setDescription('API para gerenciamento de tarefas e colaboração')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.API_PORT ?? 3000);
}

bootstrap();
