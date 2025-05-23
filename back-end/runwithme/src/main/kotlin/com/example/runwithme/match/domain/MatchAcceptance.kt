package com.example.runwithme.match.domain

import jakarta.persistence.*

@Entity
@Table(name = "match_acceptances", uniqueConstraints = [
    UniqueConstraint(columnNames = ["match_id", "acceptor_user_id"])
])
data class MatchAcceptance(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    // 어떤 매칭 요청에 대한 수락인지
    @Column(name = "match_id")
    val matchId: Long,

    @Column(name = "acceptor_user_id")
    val acceptorUserId: Long
)
