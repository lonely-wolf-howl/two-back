"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cors = require("cors");
const common_1 = require("@nestjs/common");
const response_interceptor_1 = require("./common/interceptor/response.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = 4000;
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
    }));
    app.useGlobalInterceptors(new response_interceptor_1.ResponseInterceptor());
    app.use(cors({
        origin: ['http://localhost:3000'],
        methods: 'GET, POST',
        credentials: true,
    }));
    await app.listen(port);
    console.log(`STAGE: ${process.env.STAGE}`);
    console.log(`API-GATEWAY listening on port ${port}!`);
}
bootstrap();
//# sourceMappingURL=main.js.map