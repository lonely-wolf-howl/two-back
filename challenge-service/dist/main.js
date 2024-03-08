"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
const common_1 = require("@nestjs/common");
const sentry_interceptor_1 = require("./common/interceptor/sentry.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.connectMicroservice({
        transport: microservices_1.Transport.TCP,
        options: {
            host: 'localhost',
            port: 4002,
        },
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
    }));
    app.useGlobalInterceptors(new sentry_interceptor_1.SentryInterceptor());
    await app.startAllMicroservices();
    await app.listen(4002);
    console.log(`CHALLENGE-SERVICE listening on 4002 for TCP!`);
}
bootstrap();
//# sourceMappingURL=main.js.map