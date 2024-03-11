"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const sentry_interceptor_1 = require("./common/interceptor/sentry.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = 8080;
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
    }));
    app.useGlobalInterceptors(new sentry_interceptor_1.SentryInterceptor());
    await app.listen(port);
    console.log(`CHAT-SERVICE listening on ${port}!`);
}
bootstrap();
//# sourceMappingURL=main.js.map