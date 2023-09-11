import { Expose } from 'class-transformer';

export class CommentDto {
  @Expose()
  id: number;

  @Expose()
  comment: string;
}
