package com.example.runwithme.user.dto

data class UserLoginResponse(
    // 로그인 세션 유지를 위한 JWT 토큰
    val token: String,
    // 로그인한 사용자 식별
    val userId: Long,
    // 사용자 표기용 정보
    val username: String,
    val nickname: String,
    val name: String,
    val phoneNumber: String,
    val address: String,
    val latitude: Double,
    val longitude: Double,
    val averagePace: String,
    // 매칭 기능 사용 여부
    val matchEnabled: Boolean
)
