import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthGuard } from '../../guards/auth.guard';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { CommentDto } from './dtos/comment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('/:productId/product')
  @UseGuards(AuthGuard)
  getProductComments(@Param('productId') productId: string) {
    return this.commentsService.getProductComments(productId);
  }

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(CommentDto)
  createComment(@Body() body: CreateCommentDto, @CurrentUser() user: User) {
    return this.commentsService.create(body, user.id);
  }
}
