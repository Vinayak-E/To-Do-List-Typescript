import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { TaskManager } from './taskManager';

const app = express();
const PORT = process.env.PORT || 5000;

const taskManager = new TaskManager();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req:Request, res :Response) => {
    res.render('index', { tasks: taskManager.getAllTasks() });
});
app.post('/add', (req : Request, res :Response) => {
    const { title, description } = req.body;
    taskManager.addTask(title, description);
    res.redirect('/');
});
app.post('/complete/:id', (req :Request, res:Response) => {
    const id = parseInt(req.params.id);
    taskManager.markTaskAsCompleted(id);
    res.redirect('/');
});
app.post('/edit/:id', (req :Request, res : Response) => {
    const taskId = parseInt(req.params.id, 10);
    const { title, description } = req.body;
    taskManager.updateTask(taskId, title, description);  
    res.redirect('/');
});
app.post('/delete/:id', (req : Request, res : Response) => {
    const id = parseInt(req.params.id);
    taskManager.removeTask(id);
    res.redirect('/');
});

app.post('/toggle-status/:id', (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const success: boolean = taskManager.toggleTaskStatus(id);
    res.json({ success });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});