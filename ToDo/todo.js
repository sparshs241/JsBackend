const fs=require("fs")
const path = require("path");
const filePath = path.join(__dirname, "tasks.json");


const loadTasks=()=>
{
    try{
        const dataBuffer=fs.readFileSync(filePath)
        const dataJson=dataBuffer.toString()
        return JSON.parse(dataJson)
    }
    catch(error){
        return []
    }

}

const addTask=(task)=>{
    const tasks=loadTasks()
    tasks.push({task });
    saveTasks(tasks)
}

const saveTasks=(tasks)=>{

    const dataJson=JSON.stringify(tasks)
    fs.writeFileSync(filePath,dataJson)
    
    
}

const listTasks=()=>{

    const tasks=loadTasks()
    tasks.forEach((task,index)=>{
        console.log(`${index+1} - ${task.task}`);
        
        

    })


}

const deleteTask=(taskToBeDeleted)=>{
    const tasks=loadTasks()
    const updatedTasks = tasks.filter(task =>taskToBeDeleted!=task.task);
    saveTasks(updatedTasks)
    

}

const command=process.argv[2]
const argument=process.argv[3]


if (command==="add"){
    addTask(argument)
}
else if (command==="list"){
    listTasks()
}
else if(command==="delete"){
    deleteTask(argument)
}

else{
    console.log("Command not found");
    
}