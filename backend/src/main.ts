import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: "http://localhost:5173",
  });

  // WICHTIG: Wenn das Backend im Produktionsmodus läuft, startet es auf 3000.
  // Wenn es über Vite läuft, übernimmt Vite das "listen()" automatisch!
  if (process.env.NODE_ENV === 'production') {
    await app.listen(3000);
  }

  return app;
}

export const viteNodeApp = bootstrap();
