import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manager } from './entities/manager.entity';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>
  ){}
  create(createManagerDto: CreateManagerDto) {
    return this.managerRepository.save(createManagerDto);
  }

  findAll() {
    return this.managerRepository.find();
  }

  findOne(id: string) {
    const manager = this.managerRepository.findOneBy({
      managerId: id
    })
    if(!manager) throw new NotFoundException("Manager Not Found");
  }

  async update(id: string, updateManagerDto: UpdateManagerDto) {
    const regionToUpdate = await this.managerRepository.preload({
      managerId: id,
      ...updateManagerDto
    })
    if(!regionToUpdate) throw new BadRequestException()
      return this.managerRepository.save(regionToUpdate);
  }

  remove(id: string) {
    return this.managerRepository.delete({
      managerId: id,
    });
  }
}
