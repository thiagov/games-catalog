package com.thiagov.gamescatalog.controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.thiagov.gamescatalog.dtos.AddGameDto;
import com.thiagov.gamescatalog.dtos.GameDto;
import com.thiagov.gamescatalog.exceptions.ConsoleNotFoundException;
import com.thiagov.gamescatalog.exceptions.DuplicatedGameException;
import com.thiagov.gamescatalog.services.GameService;

@RestController
@RequestMapping(value = "/api/games")
public class GameController {

    private GameService gameService;

    @Autowired
    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping
    public List<GameDto> getAllGames() {
        return gameService.getAllGames();
    }

    @PostMapping
    public GameDto addNewGame(@Valid @RequestBody AddGameDto addGameDto) throws ConsoleNotFoundException,
        DuplicatedGameException {
        return gameService.addNewGame(addGameDto);
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public List<String> handleException(MethodArgumentNotValidException exception) throws IOException {
        List<String> ret = new ArrayList<>();
        for (FieldError fieldError : exception.getBindingResult().getFieldErrors()) {
            ret.add(fieldError.getField() + ": " + fieldError.getDefaultMessage());
        }
        return ret;
    }

    @ExceptionHandler({ConsoleNotFoundException.class, DuplicatedGameException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public List<String> handleException(Exception exception) {
        List<String> ret = new ArrayList<>();
        ret.add(exception.getMessage());
        return ret;
    }
}
