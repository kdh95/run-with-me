package com.example.runwithme.user.service

import com.example.runwithme.config.jwt.JwtProvider
import com.example.runwithme.user.dto.UserLoginRequest
import com.example.runwithme.user.dto.UserLoginResponse
import com.example.runwithme.user.dto.UserRegisterRequest
import com.example.runwithme.user.repository.UserRepository
import com.example.runwithme.user.domain.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.security.core.userdetails.User as SecurityUser
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class UserService(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder,
    private val jwtProvider: JwtProvider
) : UserDetailsService {

    // ✅ 회원가입
    fun register(request: UserRegisterRequest): Long {
        if (userRepository.findByUsername(request.username) != null) {
            throw IllegalArgumentException("이미 사용 중인 아이디입니다.")
        }

        val user = User(
            name = request.name,
            username = request.username,
            password = passwordEncoder.encode(request.password),
            nickname = request.nickname,
            phoneNumber = request.phoneNumber,
            address = request.address,
            latitude = request.latitude,
            longitude = request.longitude,
            averagePace = request.averagePace,
            matchEnabled = request.matchEnabled
        )

        return userRepository.save(user).id
    }

    // ✅ 로그인
    fun login(request: UserLoginRequest): UserLoginResponse {
        val user = userRepository.findByUsername(request.username)
            ?: throw IllegalArgumentException("존재하지 않는 사용자입니다.")

        if (!passwordEncoder.matches(request.password, user.password)) {
            throw IllegalArgumentException("비밀번호가 올바르지 않습니다.")
        }

        val token = jwtProvider.generateToken(user.id, user.username)

        return UserLoginResponse(
            token = token,
            userId = user.id,
            username = user.username,
            nickname = user.nickname,
            name = user.name,
            phoneNumber = user.phoneNumber,
            address = user.address,
            latitude = user.latitude,
            longitude = user.longitude,
            averagePace = user.averagePace,
            matchEnabled = user.matchEnabled
        )
    }

    // ✅ UserDetailsService 구현
    override fun loadUserByUsername(userId: String): UserDetails {
        val user = userRepository.findById(userId.toLong())
            .orElseThrow { UsernameNotFoundException("해당 ID의 사용자를 찾을 수 없습니다: $userId") }

        return SecurityUser.builder()
            .username(user.username)
            .password(user.password)
            .authorities("USER")
            .build()
    }
}
