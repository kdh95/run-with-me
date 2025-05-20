package com.example.runwithme.notification.domain

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "notifications")
data class Notification(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    val receiverUserId: Long,   // 알림을 받을 사용자 ID
    val message: String,        // 알림 내용
    val relatedMatchId: Long?,  // 해당 알림이 연관된 매칭 ID (선택적)

    val isRead: Boolean = false,
    val createdAt: LocalDateTime = LocalDateTime.now()
)
