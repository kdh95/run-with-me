package com.example.runwithme.user.dto

data class UserLoginResponse(
    val token: String,
    val userId: Long,
    val username: String,
    val nickname: String,
    val name: String,
    val phoneNumber: String,
    val address: String,
    val latitude: Double,
    val longitude: Double,
    val averagePace: String,
    val matchEnabled: Boolean
)
