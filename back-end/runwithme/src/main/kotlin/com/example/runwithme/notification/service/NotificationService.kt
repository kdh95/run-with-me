package com.example.runwithme.notification.service

import com.example.runwithme.notification.domain.Notification
import com.example.runwithme.notification.repository.NotificationRepository
import org.springframework.stereotype.Service

@Service
class NotificationService(
    private val notificationRepository: NotificationRepository
) {

    /**
     * 특정 사용자에게 매칭 알림을 전송 (DB 저장)
     */
    fun sendMatchAlert(receiverUserId: Long, matchId: Long) {
        val message = "새로운 매칭 요청이 도착했습니다! 지금 확인해보세요."

        val notification = Notification(
            receiverUserId = receiverUserId,
            message = message,
            relatedMatchId = matchId
        )

        notificationRepository.save(notification)

        // 실시간 푸시 (WebSocket) 로직은 나중에 이 지점에서 호출
        println("🔔 알림 저장 완료 → 사용자 ID: $receiverUserId, 매칭 ID: $matchId")
    }
}
