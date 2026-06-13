const express = require('express')
const router = express.Router()
const Task = require('../models/Task')

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find()
    res.json(tasks)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST create a task
router.post('/', async (req, res) => {
  const task = new Task({
    title: req.body.title
  })
  try {
    const newTask = await task.save()
    res.json(newTask)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// PUT update task (complete/incomplete)
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
    task.completed = !task.completed
    const updatedTask = await task.save()
    res.json(updatedTask)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// DELETE a task
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id)
    res.json({ message: 'Task deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router