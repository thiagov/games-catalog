package com.thiagov.gamescatalog.controllers;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public GameDto addNewGame(@Valid @RequestBody AddGameDto addGameDto) throws ConsoleNotFoundException {
        return gameService.addNewGame(addGameDto);
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public Map<String, String> handleException(MethodArgumentNotValidException exception) throws IOException {
        Map<String, String> ret = new HashMap<>();
        for (FieldError fieldError : exception.getBindingResult().getFieldErrors()) {
            ret.put(fieldError.getField(), fieldError.getDefaultMessage());
        }
        return ret;
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public Map<String, String> handleException(ConsoleNotFoundException exception) throws IOException {
        Map<String, String> ret = new HashMap<>();
        ret.put("consoleId", exception.getMessage());
        return ret;
    }
}
