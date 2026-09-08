import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    // Nutzt den nativen Pfad-Support von Vite
    tsconfigPaths: true,
  },
  plugins: [
    ...VitePluginNode({
      adapter: 'nest',
      appPath: './src/main.ts',
      exportName: 'viteNodeApp',
      tsCompiler: 'swc',
    }),
  ],
  optimizeDeps: {
    exclude: ['@nestjs/microservices', '@nestjs/websockets', 'v8', 'amqp-connection-manager', 'amqplib', 'ioredis', 'redis', 'nats', 'mqtt', 'kafkajs', 'typeorm', 'pg'],
  },
});
