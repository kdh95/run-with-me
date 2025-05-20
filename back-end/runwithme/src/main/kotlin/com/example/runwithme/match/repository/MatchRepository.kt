package com.example.runwithme.match.repository

import com.example.runwithme.match.domain.Match
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface MatchRepository : JpaRepository<Match, Long> {
    fun findAllByMatchDate(date: java.time.LocalDate): List<Match>
}
