import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "src/auth/auth.service";
import { HelperService } from "src/helper/helper.service";
import { User } from "src/user/user.entity";
import { TaskController } from "./task.controller";
import { Subtask, Task } from "./task.entity";
import { TaskService } from "./task.service";

@Module({
    imports: [TypeOrmModule.forFeature([Task, Subtask, User]),
    JwtModule.register({
        secret: "SECRET",
        signOptions: {
        expiresIn: "24h"
    }
    })],
    providers: [TaskService, HelperService, AuthService],
    controllers: [TaskController],
    exports: []
})
export class TaskModule {}