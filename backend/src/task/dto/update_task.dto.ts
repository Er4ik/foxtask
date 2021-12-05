import { subtask } from "../task.interface";

export class UpdateTaskBody {
    name?: string;
    description?: string;
    tag?: string[];
    difficulty?: number;
    importance?: string;
    deadline?: Date;
    type?: string;
    subtask?: subtask;
}
