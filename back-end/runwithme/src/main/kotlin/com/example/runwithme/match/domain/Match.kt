package com.example.runwithme.match.domain

import jakarta.persistence.*
import java.time.LocalDate
import java.time.LocalTime

@Entity
@Table(name = "matches")
data class Match(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    val userId: Long, // 매칭 생성한 사용자 ID

    val matchDate: LocalDate,     // 매칭 희망 날짜 (예: 2025-05-22)
    val matchTime: LocalTime,     // 매칭 희망 시간 (예: 19:00)

    val targetPace: String,       // 예: "5:30"
    val targetDistanceKm: Int,    // 목표 거리 (단위: km)

    val latitude: Double,         // 위치 정보
    val longitude: Double,

    val createdAt: LocalDate = LocalDate.now() // 요청 생성 날짜 (자동 설정)
)
