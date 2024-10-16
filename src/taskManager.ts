export class Task {
    private id          : number;
    private title       : string;
    private description : string;
    private status      : boolean;

    constructor(id: number,title: string , description : string ,status : boolean = false){
         this.id           = id;
         this.title        = title;
         this.description  = description;
         this.status       = status;
    }

    getId(): number {
        return this.id;
    }

    getTitle(): string {
        return this.title
    }

    setTitle(newTitle: string): void{
        this.title = newTitle
    }

    getDescription(): string {
        return this.description
    }

    setDescription(newDescription : string): void{
        this.description = newDescription
    }

    displayTask():void {
        const statusDisplay = this.status ? "Completed" : "Incompleted";
        console.log(`Task [ID: ${this.id}] - Title: ${this.title}, Description: ${this.description}, Status: ${statusDisplay}`);
    }

    getStatus():boolean{
        return this.status;
    }

    markCompleted():void{
        this.status = true;
    }
    
    markIncomplete():void{
        this.status = false;
    } 
    toggleStatus(): void {
        this.status = !this.status;
    }

}

export class TaskManager {
    private tasks : Task[] =[];
    private nextId: number = 1;


    public addTask(title : string, description : string):void{
        const newTask = new Task(this.nextId,title,description);
        this.tasks.push(newTask);
        this.nextId++;
        console.log(`Task "${newTask.getTitle()}" has been added to the task list.`);
    }
    
    public removeTask(taskId : number):void{
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter(task => task.getId() !== taskId);
        if (this.tasks.length === initialLength) {
            console.log(`Task with ID ${taskId} not found.`);
        } else {
            console.log(`Task with ID ${taskId} has been removed.`);
        }
    }

    public markTaskAsCompleted(taskId : number){
        const task = this.findTaskById(taskId);
        if(task){
            task.markCompleted();
            console.log(`Task with ID ${taskId} has been marked as completed.`);
        } else {
            console.log(`Task with ID ${taskId} not found.`);
        }
    }

    public markTaskAsIncomplete(taskId : number){
        const task = this.findTaskById(taskId);
        if(task){
            task.markIncomplete();
            console.log(`Task with ID ${taskId} has been marked as Incompleted.`);
        } else {
            console.log(`Task with ID ${taskId} not found.`);
        }
    }

    public updateTask(taskId: number, title?: string, description?: string): void {
        const task = this.findTaskById(taskId);
        if (task) {
            if (title) task.setTitle(title);
            if (description) task.setDescription(description);
        } else {
            console.log(`Task with ID ${taskId} not found.`);
        }
    }


    public displayAllTasks(){
        console.log("Task List:");
        if (this.tasks.length === 0) {
            console.log("No tasks available.");
        } else {
            this.tasks.forEach(task => task.displayTask());
        }
    }

    public getAllTasks(): Task[] {
        return this.tasks;
    }

    public findTaskById(taskId: number): Task | undefined {
        return this.tasks.find(task => task.getId() === taskId);
    }
    
    public toggleTaskStatus(id: number): boolean {
        const task = this.findTaskById(id);
        if (task) {
            task.toggleStatus();
            console.log(`Task with ID ${id} status toggled. New status: ${task.getStatus() ? 'Completed' : 'Incompleted'}`);
            return true;
        }
        console.log(`Task with ID ${id} not found.`);
        return false;
    }
}