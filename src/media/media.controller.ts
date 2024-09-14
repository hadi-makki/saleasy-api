import {
  Controller,
  Delete,
  Get,
  Header,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { WebpPipe } from 'src/pipes/webp.pipe';
import { MediaService } from './media.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
} from 'src/error/api-responses.decorator';
import { Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/users.decorator';
import { UserEntity } from 'src/user/user.entity';

class File {
  @ApiProperty({
    format: 'binary',
    type: 'string',
  })
  file: any;
}

@Controller('media')
@ApiTags('Media')
export class MediaController {
  constructor(private mediaService: MediaService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    description: 'Upload file',
    type: File,
  })
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({
    description: 'File uploaded successfully',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  async uploadFile(
    @UploadedFile(
      WebpPipe,
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }), // 5MB
        ],
      }),
    )
    file: Express.Multer.File,
    @User() user: UserEntity,
  ) {
    return await this.mediaService.upload(file, user.id);
  }

  @Get('get/:id')
  @ApiOperation({
    summary: 'Get Single file',
    description:
      'Send the ID of the file you uploaded previously to get it from the server',
  })
  @Header('Content-Type', 'application/octet-stream')
  @Header('Content-Disposition', 'inline')
  @ApiOkResponse({
    description: 'File retrieved successfully',
  })
  @ApiInternalServerErrorResponse()
  @ApiNotFoundResponse('Media not found')
  @ApiBadRequestResponse('Bad request error')
  async downloadFile(@Param('id') id: string, @Res() res: Response) {
    await this.mediaService.getFileStreamById(id, res);
  }

  @Delete('delete/:id')
  @ApiOperation({
    summary: 'Delete file',
    description: 'Send the ID of the file you uploaded previously to delete it',
  })
  @ApiOkResponse({
    description: 'File deleted successfully',
  })
  @ApiInternalServerErrorResponse()
  @ApiNotFoundResponse('Media not found')
  @ApiBadRequestResponse('Bad request error')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async deleteFile(@Param('id') id: string) {
    return await this.mediaService.delete(id);
  }
}
