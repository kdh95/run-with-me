package com.example.runwithme.notification.repository

import com.example.runwithme.notification.domain.Notification
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface NotificationRepository : JpaRepository<Notification, Long> {
    fun findAllByReceiverUserId(receiverUserId: Long): List<Notification>
}
