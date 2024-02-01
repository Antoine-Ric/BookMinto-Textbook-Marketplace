import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/userModel.js'

// @desc    auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    res.send('auth user')
})

// @desc    Register User
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
   res.send('Register user')
})

// @desc    logout user
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
    res.send('logout user')
})

// @desc    get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    res.send('get user profile')
})

// @desc    update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    res.send('update user')
})

// @desc    get users
// @route   GET /api/users
// @access  Private/ADMIN
const getUsers = asyncHandler(async (req, res) => {
    res.send('get user')
})

// @desc    get user by ID
// @route   GET /api/users/:id
// @access  Private/ADMIN
const getUserByID = asyncHandler(async (req, res) => {
    res.send('get user by id')
})

// @desc    delete users
// @route   DELETE /api/users
// @access  Private/ADMIN
const deleteUser = asyncHandler(async (req, res) => {
    res.send('delete user')
})

// @desc    update users
// @route   PUT /api/users/:id
// @access  Private/ADMIN
const updateUser = asyncHandler(async (req, res) => {
    res.send('update user')
})

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserByID,
    updateUser,
}