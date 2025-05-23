package com.example.runwithme.notification.controller

import com.example.runwithme.notification.service.NotificationService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/notifications")
class NotificationController(
    private val notificationService: NotificationService
) {

    @PatchMapping("/{id}/read")
    fun markAsRead(@PathVariable id: Long): ResponseEntity<String> {
        notificationService.markAsRead(id)
        return ResponseEntity.ok("알림을 읽음 처리했습니다.")
    }
}
