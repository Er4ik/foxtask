export interface subtask {
    readonly name: string,
    readonly time_spent_wanted: number
}

export interface createTaskBody {
    readonly name: string,
    readonly description: string,
    readonly tag?: string[],
    readonly difficulty: number,
    readonly importance?: string,
    readonly deadline: Date,
    readonly type: string,
    readonly subtask?: subtask,
}

export interface updateTaskBody {
    readonly name?: string,
    readonly description?: string,
    readonly tag?: string[],
    readonly difficulty?: number,
    readonly importance?: string,
    readonly deadline?: Date,
    readonly type?: string,
    readonly subtask?: subtask,
}

export interface bodyCreateToDb {
    readonly name: string,
    readonly description: string,
    readonly tag?: string,
    readonly difficulty: number,
    readonly importance?: number,
    readonly deadline: Date,
    readonly type: string,
    readonly subtask?: subtask,
}

export interface bodyUpdateToDb {
    readonly name?: string,
    readonly description?: string,
    readonly tag?: string,
    readonly difficulty?: number,
    readonly importance?: number,
    readonly deadline?: Date,
    readonly type?: string,
    readonly subtask?: subtask,
}

enum importance {
    high,
    medium,
    low
}

export interface queryTaskGet {
    tag?: object,
    importance?: importance,
    difficulty?: number
}