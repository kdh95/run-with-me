package com.example.runwithme.match.dto

import java.time.LocalDate
import java.time.LocalTime

data class MatchRequest(
    val userId: Long,
    val matchDate: LocalDate,
    val matchTime: LocalTime,
    val targetPace: String,
    val targetDistanceKm: Int,
    val latitude: Double,
    val longitude: Double
)
