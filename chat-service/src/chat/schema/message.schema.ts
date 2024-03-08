import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @IsNotEmpty()
  @Prop({ required: true })
  roomToken: string;

  @IsNotEmpty()
  @Prop({
    type: [
      {
        from: { type: String, required: true },
        message: { type: String, required: true },
        time: { type: String, required: true },
      },
    ],
    required: true,
  })
  messages: Array<{ from: string; message: string; time: string }>;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
