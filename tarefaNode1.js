const rl = require('readline').createInterface({
    input : process.stdin,
    output : process.stdout
});
const concluida = 'concluida';
const pendente = 'pendente;'
const questionMsg = `Escolha uma opção da lista : \n\
    1 - Adicionar Tarefa; \n\
    2 - Listar Tarefas; \n\
    3 - Marcar tarefa como concluida; \n\
    4 - Remover Tarefa; \n\
    5 - Sair;\n`;

const listTasks = [
    {name : 'Ir ao mercado', description : 'Preciso ir ao supermercado', status : concluida},
    {name : 'Lavar Roupas', description : 'Preciso lavar minhas roupas', status : pendente},
];

const options = {
    'adicionar tarefa' : addTask,
    'listar tarefas' : listOfTasks,
    'marcar tarefa como concluida' : concludeTask,
    'remover tarefa' : removeTasks,
    'sair' : goodBye
}

function taskListStart(){
    rl.question(questionMsg, (option) => {
        optionTasks(option ?? 'Erro');
    });
}

function optionTasks(option){
    if(option.toLowerCase() in options){
        options[option]();
    }
    else{
        console.error('opção inválida');
        taskListStart();
    }
}

function addTask(){
    rl.question('Insira o nome da tarefa:\n', task => {
        rl.question('Insira a descrição da tarefa:\n', descriptionTask => {
            let existTask = false;
            let existDescription = false;

            try{
                listTasks.forEach(t => {
                    if(t.name === task){
                        existTask = true;
                    }
                    if(t.description === descriptionTask){
                        existDescription = true;
                    }
                });

                if(!existTask &&  !existDescription){
                    throw 'Tarefa e Descrição já existem na lista';
                }
                else if(!existDescription){
                    throw 'Descrição já existem na lista';
                }
                else if(!existTask){
                    throw 'Tarefa já existem na lista';
                }
    
                listTasks.push(obj);
                console.table(obj);
                console.log('Tarefa inserida com sucesso.');
                
            }catch(err){
                console.error(err);
            }finally{
                newTask();
            }
        });
    });
}

function listOfTasks(){
    try{
        listTasks.forEach(t => {
            if(listTasks.length > 0){
                console.table(t);
            }
            else {
                throw 'Não há tarefas cadastradas';
            }
        });
    }catch(err){
        console.error(err);
    }finally{
        newTask();
    }
};

// function concludeTask(){
//     rl.question('Insira o nome da tarefa:\n', answer => {
//         try{
//             listTasks.forEach(t => {
//                 if((t.name.toLowerCase() === answer.toLowerCase()) && t.status !== concluida){
//                     t.status = concluida;
//                     console.table(t);
//                 }
//                 else if(t.status === concluida){
//                     throw 'Tarefa já está com o status concluida.';
//                 }
//             });
//             console.log('Parabéns por ter concluido sua tarefa.');
//         }catch(err){
//             console.error(err);
//         }finally{
//             newTask();
//         }
//     });
// }

function concludeTask(){
    rl.question('Insira o nome da tarefa', answer => {
        try{
            const task = findTask(answer);
            const taskIsFinished = task.status === concluida ? true : false;
            
            if(task && !taskIsFinished){
                task.status = concluida;
            }
            else if(taskIsFinished){
                throw 'Essa tarefa j´s foi concluida';
            }
            else{
                throw 'Não foi encontrada uma tarefa com este nome'; //verificar
            }
        }catch(err){
            console.error(err);
        }finally{
            newTask();
        }
    });
}

function removeTasks(){
    rl.question('Insira o nome da tarefa:\n', answer => {
        listTasks.forEach((t, index) => {
            try{
                if(t.name.toLowerCase() === answer.toLowerCase()){
                    listTasks.splice(index, 1);
                    console.table(t);
                    console.log('Tarefa removida com sucesso.');
                }
                else{
                    throw 'Não existe uma tarefa com este nome';
                }
            }catch(err){
                console.error(err);
            }finally{
                newTask();
            }
        });
    });
}

function findTask(answer){
    const task = listTasks.find(taskItem => taskItem.name.toLowerCase() === answer.toLowerCase());

    if(!task){
        return null;
    }
    return task;
}

function goodBye(){
    console.log('Até Logo!');
    rl.close();
}

function newTask(){
    rl.question('Deseja executar uma nova tarefa? (S/N)\n', answer => answer.toUpperCase() === 'S' ? taskListStart() : goodBye());
}

taskListStart();
