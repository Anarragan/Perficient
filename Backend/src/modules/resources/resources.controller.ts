import { Controller, Get, Post, Body, Patch, Param, Delete, Sse, UseGuards } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Observable, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ApiSecurity, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('resources')
@UseGuards(JwtAuthGuard)
@ApiSecurity('api-key')
@ApiBearerAuth('JWT')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Post()
  async create(@Body() createResourceDto: CreateResourceDto) {
    return this.resourcesService.create(createResourceDto);
  }

  @Get()
  async findAll() {
    return this.resourcesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.resourcesService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateResourceDto: UpdateResourceDto) {
    return this.resourcesService.update(id, updateResourceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.resourcesService.remove(id);
  }

  @Sse('user/:userId/stream')
  streamUserResources(@Param('userId') userId: string): Observable<MessageEvent> {
    return interval(1000).pipe(
      switchMap(async () => {
        const resources = await this.resourcesService.findByUserId(userId);
        return { data: resources } as MessageEvent;
      }),
    );
  }
}
