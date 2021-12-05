import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("tasks")
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({default: null})
    tag?: string;

    @Column()
    difficulty: number;

    @Column({default: null})
    importance?: number;

    @Column()
    deadline: Date;

    @Column()
    type: string;

    @Column()
    id_user: number;

    @OneToMany(() => Subtask, subtask => subtask.task, {cascade: true}) 
    subtasks: Subtask[];
}

@Entity("subtasks")
export class Subtask {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    time_spent_wanted: number;

    @ManyToOne(() => Task, task => task.subtasks, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'task_id'})
    task: Task;
}