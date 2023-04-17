const task =  require('../models/task')
const asyncWrapper=require('../middleware/async')
const {createCustomError}=require('../errors/custom-error')


const getAllTasks= asyncWrapper(async (req,res)=>{
        const tasks=await task.find({})
        res.status(200).json({tasks}) 
})


const createTask=asyncWrapper( async (req,res)=>{
        const Task=await task.create(req.body)
        res.status(201).json({Task})   
})


const getTask=asyncWrapper( async (req,res)=>{
        const{id:taskID}=req.params
        const foundTask =await task.findOne({_id:taskID});
        if(!foundTask){
            return next(createCustomError(`No task found`,404))
        }
        res.status(200).json({foundTask})
    
})
   


const updateTask=asyncWrapper(async (req,res)=>{
        const {id:taskID}=req.params
        const upTask = await task.findOneAndUpdate({_id:taskID},req.body,{
            new:true,
            runValidators:true,
        })
        res.status(200).json({upTask})
        if(!upTask){
            return next(createCustomError(`No task found`,404))
        }
       
})


const deleteTask=asyncWrapper( async (req,res)=>{
        const {id:taskID}= req.params
        const delTask= await task.findByIdAndDelete({_id:taskID })


        if(!delTask){
            return next(createCustomError(`No task found`,404))
        }
        
        
        res.status(200).json({delTask})
})




module.exports={
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,   
}