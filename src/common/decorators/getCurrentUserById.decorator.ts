import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetCurrentUserById = createParamDecorator(
  (_: undefined, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();
    return request.user['sub'];
  },
);
