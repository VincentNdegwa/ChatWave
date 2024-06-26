import { Injectable } from '@nestjs/common';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { Role, createParticipantParams } from 'src/type';
import { InjectRepository } from '@nestjs/typeorm';
import { Participant } from './entities/participant.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectRepository(Participant)
    private participantRepository: Repository<Participant>,
  ) {}
  async create(
    createParticipantParams: createParticipantParams,
    manager: EntityManager,
  ) {
    try {
      const participants = [];

      const userParticipant = this.participantRepository.create({
        chat: { id: createParticipantParams.conversationId },
        user: { id: createParticipantParams.userId.user_id },
        role: Role.ADMIN,
      });

      const addedUserParticipant = this.participantRepository.create({
        chat: { id: createParticipantParams.conversationId },
        user: { id: createParticipantParams.userId.added_user_id },
        role: Role.OTHER,
      });

      participants.push(userParticipant, addedUserParticipant);

      const allParticipants = await manager.save(Participant, participants);
      return {
        error: false,
        message: 'Partcipants created',
        data: allParticipants,
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
        data: null,
      };
    }
  }

  findAll() {
    return `This action returns all participants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} participant`;
  }

  update(id: number, updateParticipantDto: UpdateParticipantDto) {
    return `This action updates a #${id} participant ${updateParticipantDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} participant`;
  }
}
