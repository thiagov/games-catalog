package com.thiagov.gamescatalog.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.thiagov.gamescatalog.dtos.AddGameDto;
import com.thiagov.gamescatalog.dtos.GameDto;
import com.thiagov.gamescatalog.exceptions.ConsoleNotFoundException;
import com.thiagov.gamescatalog.models.Console;
import com.thiagov.gamescatalog.models.Game;
import com.thiagov.gamescatalog.repositories.ConsoleRepository;
import com.thiagov.gamescatalog.repositories.GameRepository;

@Service
public class GameService {

    private GameRepository gameRepository;
    private ConsoleRepository consoleRepository;

    @Autowired
    public GameService(GameRepository gameRepository, ConsoleRepository consoleRepository) {
        this.gameRepository = gameRepository;
        this.consoleRepository = consoleRepository;
    }

    public GameDto addNewGame(AddGameDto addGameDto) throws ConsoleNotFoundException {
        Optional<Console> console = consoleRepository.findById(addGameDto.getConsoleId());
        if (!console.isPresent()) {
            throw new ConsoleNotFoundException("Console with id "
                    + addGameDto.getConsoleId() + " not found.");
        }
        Game gameToCreate = new Game(
                addGameDto.getTitle(),
                addGameDto.getYear(),
                console.get(),
                addGameDto.getCompletionDate(),
                addGameDto.getPersonalNotes());
        gameToCreate = gameRepository.save(gameToCreate);
        return new GameDto(gameToCreate);
    }

    public List<GameDto> getAllGames() {
        List<Game> allGames = gameRepository.findAll(Sort.by(Sort.Direction.DESC, "completionDate")
                .and(Sort.by(Sort.Direction.ASC, "title")));
        return allGames.stream().map(GameDto::new).collect(Collectors.toList());
    }
}
