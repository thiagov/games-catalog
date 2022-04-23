package com.thiagov.gamescatalog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.thiagov.gamescatalog.models.Game;

public interface GameRepository extends JpaRepository<Game, Integer> {

}
