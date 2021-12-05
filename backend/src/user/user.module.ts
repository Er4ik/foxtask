import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "src/auth/auth.service";
import { HelperService } from "src/helper/helper.service";
import { UserController } from "./user.controller";
import { User } from "./user.entity";
import { Auth, UserService } from "./user.service";

@Module({
    imports: [TypeOrmModule.forFeature([User]),
    JwtModule.register({
        secret: "SECRET",
        signOptions: {
      expiresIn: "24h"
    }
    })],
    providers: [UserService, HelperService, Auth, AuthService],
    controllers: [UserController],
    exports: []
})
export class UserModule {}