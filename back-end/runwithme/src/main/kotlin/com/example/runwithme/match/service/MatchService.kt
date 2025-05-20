package com.example.runwithme.match.service

import com.example.runwithme.match.domain.Match
import com.example.runwithme.match.dto.MatchRequest
import com.example.runwithme.match.repository.MatchRepository
import com.example.runwithme.notification.service.NotificationService
import com.example.runwithme.user.repository.UserRepository
import org.springframework.stereotype.Service
import java.time.LocalDate

@Service
class MatchService(
    private val matchRepository: MatchRepository,
    private val userRepository: UserRepository,
    private val notificationService: NotificationService
) {

    fun processMatchRequest(request: MatchRequest) {
        // 1. 매칭 요청 저장
        val match = Match(
            userId = request.userId,
            matchDate = request.matchDate,
            matchTime = request.matchTime,
            targetPace = request.targetPace,
            targetDistanceKm = request.targetDistanceKm,
            latitude = request.latitude,
            longitude = request.longitude,
            isMatched = false,
            createdAt = LocalDate.now()
        )
        val savedMatch = matchRepository.save(match)

        // 2. 조건에 맞는 사용자 검색
        val candidates = userRepository.findNearbyUsersByPace(
            pace = request.targetPace,
            latitude = request.latitude,
            longitude = request.longitude,
            excludeUserId = request.userId
        )

        // 3. 각 사용자에게 알림 저장
        candidates.forEach {
            notificationService.sendMatchAlert(it.id, savedMatch.id)
        }
    }
}
