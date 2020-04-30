const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Todo = require('../models/Todo');

/** 
 * @desc    Get All Todos   
 * @route   GET /api/v1/todos
 * @access  Public 
**/
exports.getTodos = asyncHandler(async (req, res, next) => {


    const todos = await Todo.find();

    return res.status(200).json({
        success: true,
        count: todos.length,
        data: todos
    });

});

/** 
 * @desc    Get Single Todo  
 * @route   GET /api/v1/todos/:id
 * @access  Public 
**/
exports.getSingleTodo = asyncHandler(async (req, res, next) => {

    const todo = await Todo.findById(req.params.id);

    if(!todo) {
        return next(new ErrorResponse(`Todo not found with the ID of ${req.params.id}`, 404));
    }

    return res.status(200).json({
        success: true,
        data: todo
    });

});

/** 
 * @desc    Create Todo
 * @route   GET /api/v1/todos
 * @access  Public 
**/
exports.createTodo = asyncHandler(async (req, res, next) => {

    const todo = await Todo.create(req.body);

    return res.status(200).json({
        success: true,
        data: todo
    });

});

/** 
 * @desc    Update Todo
 * @route   PUT /api/v1/todos/:id
 * @access  Public 
**/
exports.updateTodo = asyncHandler(async (req, res, next) => {

    let todo = await Todo.findById(req.params.id);

    if(!todo) {
        return next(new ErrorResponse(`Todo not found with the ID of ${req.params.id}`));
    }

    todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    return res.status(200).json({
        success: true,
        data: todo
    });

});

/** 
 * @desc    Delete Todo
 * @route   DELETE /api/v1/todos/:id
 * @access  Public 
**/
exports.deleteTodo = asyncHandler(async (req, res, next) => {

    const todo = await Todo.findById(req.params.id);

    if(!todo) {
        return next(new ErrorResponse(`Todo not found with the ID of ${req.params.id}`));
    }

    todo.remove();

    return res.status(200).json({
        success: true,
        data: todo
    });

});
