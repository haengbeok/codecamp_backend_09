import { Module } from '@nestjs/common';
import { FilesResolever } from './files.resolver';
import { FilesService } from './files.service';

@Module({
  providers: [
    FilesResolever, //
    FilesService,
  ],
})
export class FilesModule {}
