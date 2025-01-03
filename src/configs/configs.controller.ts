import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../common/guards/roles.guard';
import { JwtAuthGuard } from '../common/guards/jwt.guard';
import { ConfigsService } from './configs.service';
import { CreateConfigDto } from './dto/create-config.dto';
import { UpdateConfigDto } from './dto/update-config.dto';
import { Role } from '../common/enums/role.enum';
import { Roles } from '../common/decorators';

@Controller('configs')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ConfigsController {
  constructor(private readonly configsService: ConfigsService) {}

  @Post()
  create(@Body() createConfigDto: CreateConfigDto) {
    return this.configsService.create(createConfigDto);
  }

  @Get()
  findAll() {
    return this.configsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.configsService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.SUPER)
  update(@Param('id') id: string, @Body() updateConfigDto: UpdateConfigDto) {
    return this.configsService.update(id, updateConfigDto);
  }

  @Delete(':id')
  @Roles(Role.SUPER)
  remove(@Param('id') id: string) {
    return this.configsService.remove(id);
  }
}
