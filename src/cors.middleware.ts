/* eslint-disable prettier/prettier */
import {  Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: any, res: any, next: any) {
    return next();
  }
}
