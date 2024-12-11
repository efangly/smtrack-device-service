import { Controller, Get, Post, Body, Put, Param, Delete, UseInterceptors, UploadedFile, UseGuards, Request } from '@nestjs/common';
import { DeviceService } from './device.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { RolesGuard } from '../common/guards/roles.guard';
import { JwtAuthGuard } from '../common/guards/jwt.guard';
import { JwtPayloadDto } from '../common/dto/payload.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('device')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post()
  @Roles(Role.SUPER)
  @UseInterceptors(FileInterceptor('image'))
  async create(@Body() createDeviceDto: CreateDeviceDto, @UploadedFile() file: Express.Multer.File) {
    return this.deviceService.create(createDeviceDto, file);
  }

  @Get()
  @Roles(Role.SUPER, Role.SERVICE, Role.ADMIN, Role.LEGACY_ADMIN)
  async findAll(@Request() req: { user: JwtPayloadDto }) {
    return this.deviceService.findAll(req.user);
  }

  @Get(':id')
  @Roles(Role.SUPER, Role.SERVICE)
  async findOne(@Param('id') id: string) {
    return this.deviceService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.SUPER, Role.SERVICE, Role.ADMIN, Role.LEGACY_ADMIN)
  @UseInterceptors(FileInterceptor('image'))
  async update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto, @UploadedFile() file: Express.Multer.File) {
    return this.deviceService.update(id, updateDeviceDto, file);
  }

  @Delete(':id')
  @Roles(Role.SUPER)
  async remove(@Param('id') id: string) {
    return this.deviceService.remove(id);
  }
}