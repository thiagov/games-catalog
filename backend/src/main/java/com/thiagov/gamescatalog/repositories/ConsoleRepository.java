package com.thiagov.gamescatalog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.thiagov.gamescatalog.models.Console;

public interface ConsoleRepository extends JpaRepository<Console, Integer> {

}
