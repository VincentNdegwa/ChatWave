import { Injectable } from '@nestjs/common';
import { UpdateMessageDto } from './dto/update-message.dto';
import { createMessageParams } from 'src/type';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { ChatsService } from 'src/chats/chats.service';
import { UsersService } from 'src/users/users.service';
import { ParticipantsService } from 'src/participants/participants.service';
import { chatAndUserDto } from 'src/participants/dto/chat-and-user.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    private chatService: ChatsService,
    private userService: UsersService,
    private participantService: ParticipantsService,
  ) {}
  async create(createMessageParams: createMessageParams) {
    try {
      const chatExistData = await this.chatService.findExactlyOne(
        createMessageParams.chat_id,
      );
      if (!chatExistData || chatExistData.error) {
        return chatExistData;
      }
      const chatAndUserDto: chatAndUserDto = {
        chatId: createMessageParams.chat_id,
        senderId: createMessageParams.sender_id,
      };
      const participantExistData =
        await this.participantService.findBy(chatAndUserDto);
      if (
        !participantExistData ||
        participantExistData.error ||
        participantExistData.data.length === 0
      ) {
        return {
          error: true,
          message: 'User is not a participant of the chat',
          data: null,
        };
      }

      const newMessage = this.messageRepository.create({
        text: createMessageParams.text,
        sent_at: new Date(),
        chat: { id: createMessageParams.chat_id },
        sender: { id: createMessageParams.sender_id },
      });

      const savedMessage = await this.messageRepository.save(newMessage);
      const retrievedMessage = await this.findOne(savedMessage.id);
      return retrievedMessage;
    } catch (error) {
      return {
        error: true,
        message: 'Failed to create message',
        data: error.message,
      };
    }
  }
  findAll() {
    return `This action returns all messages`;
  }

  async findOne(id: number) {
    try {
      const chats = await this.messageRepository.findOne({
        where: { id },
        relations: ['sender', 'sender.profile'],
      });
      if (!chats) {
        return {
          error: true,
          message: 'Message not found',
          data: null,
        };
      } else {
        return { error: true, message: 'Message retrieved', data: chats };
      }
    } catch (error) {}
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message ${updateMessageDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
