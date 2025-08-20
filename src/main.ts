import { NestFactory } from '@nestjs/core';
import { RedisService } from './core/redis/redis.service';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import { ms, StringValue } from './shared/utils/ms.util';
import { parseBoolean } from './shared/utils/parse-boolean.util';
import RedisStore from 'connect-redis';
import { CoreModule } from './core/core.module';
import { ResponseInterceptor } from '@/src/shared/interceptors/response.interceptor';
import { HttpExceptionFilter } from '@/src/shared/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(CoreModule);

  const config = app.get(ConfigService);
  const redis = app.get(RedisService);
  app.use(cookieParser(config.getOrThrow<string>('COOKIES_SECRET')));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(
    session({
      secret: config.getOrThrow<string>('SESSION_SECRET'),
      name: config.getOrThrow<string>('SESSION_NAME'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        domain: config.getOrThrow<string>('SESSION_DOMAIN'),
        maxAge: ms(config.getOrThrow<StringValue>('SESSION_MAX_AGE')),
        httpOnly: parseBoolean(config.getOrThrow<string>('SESSION_HTTP_ONLY')),
        secure: parseBoolean(config.getOrThrow<string>('SESSION_SECURE')),
        sameSite: 'lax',
      },
      store: new RedisStore({
        client: redis,
        prefix: config.getOrThrow<string>('SESSION_FOLDER'),
      }),
    }),
  );

  app.enableCors({
    // origin: config.getOrThrow<string>('ALLOWED_ORIGIN'),
    origin: '*',
    credentials: true,
    exposeHeaders: ['set-cookie'],
  });
  app.setGlobalPrefix('api');

  await app.listen(config.getOrThrow<string>('APPLICATION_PORT') ?? 3000);
}
bootstrap();
