import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { ProbeService } from './probe.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { JwtAuthGuard } from '../common/guards/jwt.guard';
import { CreateProbeDto } from './dto/create-probe.dto';
import { UpdateProbeDto } from './dto/update-probe.dto';
import { Role } from '../common/enums/role.enum';
import { Roles } from '../common/decorators';

@Controller('probe')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProbeController {
  constructor(private readonly probeService: ProbeService) {}

  @Post()
  @Roles(Role.SUPER, Role.SERVICE)
  async create(@Body() createProbeDto: CreateProbeDto) {
    return this.probeService.create(createProbeDto);
  }

  @Get()
  async findAll() {
    return this.probeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.probeService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.SUPER, Role.SERVICE)
  async update(@Param('id') id: string, @Body() updateProbeDto: UpdateProbeDto) {
    return this.probeService.update(id, updateProbeDto);
  }

  @Delete(':id')
  @Roles(Role.SUPER)
  async remove(@Param('id') id: string) {
    return this.probeService.remove(id);
  }
}
