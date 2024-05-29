"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
const common_1 = require("@nestjs/common");
const httpLogs = require("morgan");
const helmet_1 = require("helmet");
const errorHandler_1 = require("./middlewares/errorHandler");
const swagger_1 = require("@nestjs/swagger");
dotenv.config({ path: '.env' });
const port = +process.env.PORT ?? 4000;
const environment = process.env.NODE_ENV || 'local';
const keepNestLogging = environment == 'local' ? true : false;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: keepNestLogging,
    });
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Ibus Backend')
        .setVersion('1.0')
        .addServer(`http://localhost:${port}/`, 'Local environment')
        .build();
    app.setGlobalPrefix('api');
    app.use(httpLogs('dev'));
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use((0, helmet_1.default)());
    app.enableCors();
    app.useGlobalFilters(new errorHandler_1.AllExceptionsFilter());
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api-docs', app, document);
    await app.listen(port);
    console.log('App is running at http://localhost:%d in %s mode', port, environment);
}
bootstrap();
//# sourceMappingURL=main.js.map