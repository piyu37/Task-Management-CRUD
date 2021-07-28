import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.tasksService.getTasks(filterDto);
    }

    @Get(':id')
    getTaskByID(@Param('id') id): Promise<Task> {
        return this.tasksService.getTaskByID(id);
    }

    @Post()
    createTask(
        @Body() createTaskDto: CreateTaskDto): Promise<Task> {

        return this.tasksService.createTask(createTaskDto);
    }

    @Delete(':id')
    deleteTaskByID(@Param('id') id): Promise<void> {
        return this.tasksService.deleteTaskByID(id);
    }

    @Patch(':id/status')
    updateTaskStatus(
        @Param('id') id,
        @Body() updateTaskStatusDto: UpdateTaskStatusDto): Promise<Task> {
        return this.tasksService.updateTaskStatus(id, updateTaskStatusDto.status);
    }
}
