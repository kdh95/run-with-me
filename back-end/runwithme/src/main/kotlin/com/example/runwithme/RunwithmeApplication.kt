package com.example.runwithme

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class RunwithmeApplication

fun main(args: Array<String>) {
	runApplication<RunwithmeApplication>(*args)
}
