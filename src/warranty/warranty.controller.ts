import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { WarrantyService } from './warranty.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { JwtAuthGuard } from '../common/guards/jwt.guard';
import { CreateWarrantyDto } from './dto/create-warranty.dto';
import { UpdateWarrantyDto } from './dto/update-warranty.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { JwtPayloadDto } from '../common/dto';

@Controller('warranty')
@UseGuards(JwtAuthGuard, RolesGuard)
export class WarrantyController {
  constructor(private readonly warrantyService: WarrantyService) {}

  @Post()
  @Roles(Role.SUPER, Role.SERVICE)
  async create(@Body() createWarrantyDto: CreateWarrantyDto) {
    return this.warrantyService.create(createWarrantyDto);
  }

  @Get()
  async findAll(@Request() req: { user: JwtPayloadDto }) {
    return this.warrantyService.findAll(req.user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.warrantyService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.SUPER, Role.SERVICE)
  async update(@Param('id') id: string, @Body() updateWarrantyDto: UpdateWarrantyDto) {
    return this.warrantyService.update(id, updateWarrantyDto);
  }

  @Delete(':id')
  @Roles(Role.SUPER)
  async remove(@Param('id') id: string) {
    return this.warrantyService.remove(id);
  }
}
