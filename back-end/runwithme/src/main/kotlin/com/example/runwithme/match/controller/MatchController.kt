package com.example.runwithme.match.controller

import com.example.runwithme.match.dto.MatchRequest
import com.example.runwithme.match.service.MatchService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/matches")
class MatchController(
    private val matchService: MatchService
) {

    @PostMapping
    fun requestMatch(@RequestBody request: MatchRequest): ResponseEntity<String> {
        matchService.processMatchRequest(request)
        return ResponseEntity.ok("매칭 요청이 완료되었습니다.")
    }
}
