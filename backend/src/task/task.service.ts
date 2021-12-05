import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { HelperService } from "src/helper/helper.service";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";
import { Subtask, Task } from "./task.entity";
import { createTaskBody, queryTaskGet, updateTaskBody } from "./task.interface";

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
        @InjectRepository(Subtask)
        private readonly subtaskRepository: Repository<Subtask>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly helper: HelperService,
        private jwtService: JwtService
        ) {}
    
    async getAllTasks(query: queryTaskGet): Promise<object> {
        try {
            const conditions = await this.helper.prepareQuery(query)

            const task = await this.taskRepository
                .createQueryBuilder("tasks")
                .where(conditions)
                .orderBy('tasks.importance')
                .addOrderBy('tasks.difficulty')
                .leftJoinAndSelect('tasks.subtasks', 'subtask')
                .getMany()
            return {task};
        } catch(err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getTaskById(id: string): Promise<object> {
        try {
            const task = await this.taskRepository.findOne({id: Number(id)})

            const subtask = await this.subtaskRepository.findOne({id: Number(id)})
            
            return {task, subtask};
        } catch(err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createTask(body: createTaskBody, header: object): Promise<void> {
        try {
            if(this.helper.validationTaskBody(body)) {
                const token = header['authorization'].split(' ')[1];
                const verToken = this.jwtService.verify(token);

                const user = await this.userRepository.findOne({
                    where: {
                        email: verToken.email
                    }
                })
                
                const resBody = await this.helper.prepareTaskBodyToAdd(body);
                resBody['id_user'] = user.id;
                await this.taskRepository.save(resBody);
                return;
            }
            throw new HttpException(`Error valid create task`, HttpStatus.BAD_REQUEST)
        } catch(err) {
            throw new HttpException(err.message, err.status);
        }
    }

    async updateTask(body: updateTaskBody, id: string): Promise<void> {
        try {
            if(this.helper.validationTaskBody(body)) {
                const resBody = await this.helper.prepareTaskBodyToAdd(body);
                await this.taskRepository.update({id: Number(id)}, resBody);
                return;
            }
            throw new HttpException(`Error valid update task`, HttpStatus.BAD_REQUEST)
        } catch(err) {
            throw new HttpException(`Error update task -> ${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteTask(id: string):  Promise<void> {
        try {
            await this.taskRepository.delete({id: Number(id)});
            return;
        } catch(err) {
            throw new HttpException(`Error delete task -> ${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}