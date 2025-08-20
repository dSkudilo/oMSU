import { createParamDecorator } from '@nestjs/common';
import { User } from '@prisma/generated';

export const Authorized = createParamDecorator(
  (data: keyof User | Array<keyof User>, ctx) => {
    const user = ctx.switchToHttp().getRequest().user as User;
    console.log(data, data && Array.isArray(data));
    if (data && Array.isArray(data)) {
      return data.reduce((acc: Partial<User>, e) => {
        // @ts-ignore
        acc[e] = user[e];
        return acc;
      }, {});
    } else if (data) {
      // @ts-ignore
      return { data: user[data] };
    }

    return user;
  },
);
