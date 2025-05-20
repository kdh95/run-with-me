package com.example.runwithme.user.repository

import com.example.runwithme.user.domain.User
import org.springframework.data.jpa.repository.JpaRepository

interface UserRepository : JpaRepository<User, Long> {
    fun findByUsername(username: String): User?

    @Query(
        """
        SELECT u.* FROM users u
        WHERE u.average_pace = :pace
          AND u.match_enabled = true
          AND u.id != :excludeUserId
          AND (
            6371 * acos(
              cos(radians(:latitude)) *
              cos(radians(u.latitude)) *
              cos(radians(u.longitude) - radians(:longitude)) +
              sin(radians(:latitude)) * sin(radians(u.latitude))
            )
          ) < :distanceKm
        """,
        nativeQuery = true
    )
    fun findNearbyUsersByPace(
        @Param("pace") pace: String,
        @Param("latitude") latitude: Double,
        @Param("longitude") longitude: Double,
        @Param("distanceKm") distanceKm: Double = 5.0,
        @Param("excludeUserId") excludeUserId: Long
    ): List<User>
}
