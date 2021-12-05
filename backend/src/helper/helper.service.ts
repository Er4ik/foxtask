import { Injectable } from "@nestjs/common";
import { createTaskBody, queryTaskGet, updateTaskBody } from "src/task/task.interface";
import { userCreateBody, userUpdateBody } from "src/user/user.interface";
import { Like } from "typeorm";

@Injectable()
export class HelperService {
    async validationTaskBody(body: createTaskBody | updateTaskBody) {
        const availableValue = {
            importance: ['high', 'medium', 'low'],
            type: ['consistent', 'inconsistent']
        }

        const dateNow = new Date();

        for(const key in body) {
            if(availableValue[key] && !availableValue[key].includes(body[key].toLowerCase())) return false;
            else if(key === 'deadline' && body[key] < dateNow) return false;
            else if(key === 'tag') {
                for(const elem in body[key]) {
                    if(elem.length > 10) return false;
                }
            }
            else if(key === 'difficulty' && body[key] <= 0) return false;
        }
    }

    checkValidBodyUser(body: userCreateBody | userUpdateBody): boolean {
        /*let flag: boolean = true;
        const nameRx: RegExp = /([A-Za-z._])\w+/;
        const emailRx: RegExp = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$/;
        const passwordRx: RegExp = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g;

        for(const key in body) {
            if(key === "email" && !emailRx.test(body[key])) {
                flag = false;
            }
            else if(key === "name" && !nameRx.test(body[key])) {
                flag = false;
            }
            else if(key === "password" && !passwordRx.test(body[key])) {
                flag = false;
            }
        }*/
        return true;
    }

    async prepareQuery(query: queryTaskGet): Promise<queryTaskGet> {
        const fields: queryTaskGet = {}
        for(const key in query) {
            if(key === 'tag') {
                fields[key] = Like(`%${query[key]}%`);
                continue;
            }
            fields[key] = +query[key];
        }
        return fields;
    }

    async prepareTaskBodyToAdd(body: createTaskBody | updateTaskBody) {
        const intField = ['importance']
        const valueImportance = ['low', 'medium', 'high']

        const resBody = {}
        for(const key in body) {
            if(intField.includes(key)) {
                resBody[key] = valueImportance.indexOf(body[key])+1;
                continue;
            }
            resBody[key] = body[key];
            continue;
        }

        return resBody;
    }
}