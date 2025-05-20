package com.example.runwithme.user.dto

data class UserRegisterRequest(
    val name: String,
    val username: String,
    val password: String,
    val nickname: String,
    val phoneNumber: String,
    val address: String,
    val latitude: Double,
    val longitude: Double,
    val averagePace: String,
    val matchEnabled: Boolean
)
