package com.example.runwithme.config.jwt

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.util.*

@Component // 스프링 빈으로 등록해서 주입 가능하게 함
class JwtProvider(
    // application.yml에 설정된 값을 가져옴 (32자 이상 필요)
    @Value("\${jwt.secret}") private val secretKey: String,

    // 토큰 만료 시간 (ms 단위, 예: 86400000 = 1일)
    @Value("\${jwt.expiration-ms}") private val expirationMs: Long
) {
    /**
     * JWT 토큰 생성 메서드
     * @param userId: 토큰 소유자 ID (subject로 사용)
     * @param username: 토큰에 저장할 사용자 이름 (claim으로 포함)
     */
    fun generateToken(userId: Long, username: String): String {
        // HMAC-SHA 방식으로 사용할 비밀 키 생성 (HS256과 호환되도록 바이트 배열로 변환)
        val key = Keys.hmacShaKeyFor(secretKey.toByteArray())

        return Jwts.builder()
            .setSubject(userId.toString()) // 토큰의 주제(subject)에 userId 설정
            .claim("username", username)   // 커스텀 클레임으로 username 추가
            .setIssuedAt(Date())           // 토큰 발행 시간
            .setExpiration(Date(System.currentTimeMillis() + expirationMs)) // 만료 시간 설정
            .signWith(key, SignatureAlgorithm.HS256) // 서명 알고리즘과 키 설정
            .compact() // 최종적으로 JWT 문자열로 직렬화하여 반환
    }
}
