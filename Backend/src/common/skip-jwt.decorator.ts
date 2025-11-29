import { SetMetadata } from '@nestjs/common';

export const SKIP_JWT = 'skipJwt';
export const SkipJwt = () => SetMetadata(SKIP_JWT, true);