package com.example.runwithme.notification.service

import com.example.runwithme.notification.domain.Notification
import com.example.runwithme.notification.repository.NotificationRepository
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class NotificationService(
    private val notificationRepository: NotificationRepository,
    private val messagingTemplate: SimpMessagingTemplate
) {

    /**
     * 알림 저장 후 실시간 WebSocket 푸시
     */
    fun sendMatchAlert(receiverUserId: Long, matchId: Long) {
        val message = "새로운 매칭 요청이 도착했습니다! 지금 확인해보세요."

        // 1. DB 저장
        val notification = Notification(
            receiverUserId = receiverUserId,
            message = message,
            relatedMatchId = matchId,
            createdAt = LocalDateTime.now()
        )
        notificationRepository.save(notification)

        // 2. WebSocket 푸시
        messagingTemplate.convertAndSend(
            "/topic/notifications/$receiverUserId",
            mapOf(
                "message" to message,
                "matchId" to matchId,
                "timestamp" to notification.createdAt.toString()
            )
        )
        println("🔔 WebSocket 알림 전송 → /topic/notifications/$receiverUserId")
    }


    fun markAsRead(id: Long) {
    val notification = notificationRepository.findById(id)
        .orElseThrow { IllegalArgumentException("알림이 존재하지 않습니다.") }

    val updated = notification.copy(isRead = true)
    notificationRepository.save(updated)
}

}
