package com.example.runwithme.user.domain

import jakarta.persistence.*

@Entity
@Table(name = "users")
data class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    val name: String,
    @Column(unique = true)
    val username: String,
    val password: String,
    val nickname: String,
    val phoneNumber: String,
    val address: String,
    val latitude: Double,
    val longitude: Double,
    val averagePace: String,
    val matchEnabled: Boolean
)
