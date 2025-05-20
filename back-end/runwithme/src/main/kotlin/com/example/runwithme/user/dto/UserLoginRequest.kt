package com.example.runwithme.user.dto

data class UserLoginRequest(
    // 사용자가 회원가입 시 만든 로그인용 아이디
    val username: String, 
    // 평문 비밀번호
    val password: String   
)
