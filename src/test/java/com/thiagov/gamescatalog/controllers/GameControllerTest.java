package com.thiagov.gamescatalog.controllers;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.thiagov.gamescatalog.dtos.GameDto;
import com.thiagov.gamescatalog.exceptions.ConsoleNotFoundException;
import com.thiagov.gamescatalog.services.GameService;

@WebMvcTest({GameController.class})
@ExtendWith(SpringExtension.class)
class GameControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private GameService gameService;

    @Test
    public void shouldSaveAndReturnNewGameWhenAllParamsAreValid() throws JsonProcessingException, Exception {
        Map<String,Object> body = new HashMap<>();
        body.put("title", "Mario");
        body.put("year", "2017");
        body.put("consoleId", "1");
        body.put("completionDate", "2020-03-20");
        body.put("personalNotes", "My notes");

        when(gameService.addNewGame(any())).thenReturn(new GameDto(1, "Mario", (short) 2015, "Switch", LocalDate.of(2022, 3, 3), "My notes"));

        this.mockMvc
            .perform(post("/api/games")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(body))
                .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(content().contentType("application/json"));
    }

    @Test
    public void shouldReturnErrorWhenTitleIsTooBig() throws JsonProcessingException, Exception {
        Map<String,Object> body = new HashMap<>();
        body.put("title", "Very Big Title With More than 100 characters. This can not be inserted on the database, and an exception must be thrown.");
        body.put("year", "1971");
        body.put("consoleId", "1");
        body.put("completionDate", "2020-03-20");
        body.put("personalNotes", "My notes");

        this.mockMvc
            .perform(post("/api/games")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(body))
                .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isBadRequest())
            .andExpect(content().contentType("application/json"))
            .andExpect(jsonPath("$.title", is("Title must be between 1 and 100 characters long")));
    }

    @Test
    public void shouldReturnErrorWhenTitleIsNull() throws JsonProcessingException, Exception {
        Map<String,Object> body = new HashMap<>();
        body.put("year", "1971");
        body.put("consoleId", "1");
        body.put("completionDate", "2020-03-20");
        body.put("personalNotes", "My notes");

        this.mockMvc
            .perform(post("/api/games")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(body))
                .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isBadRequest())
            .andExpect(content().contentType("application/json"))
            .andExpect(jsonPath("$.title", is("Title must not be empty")));
    }

    @Test
    public void shouldReturnErrorWhenYearIsInvalid() throws JsonProcessingException, Exception {
        Map<String,Object> body = new HashMap<>();
        body.put("title", "Mario");
        body.put("year", "1969");
        body.put("consoleId", "1");
        body.put("completionDate", "2020-03-20");
        body.put("personalNotes", "My notes");

        this.mockMvc
            .perform(post("/api/games")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(body))
                .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isBadRequest())
            .andExpect(content().contentType("application/json"))
            .andExpect(jsonPath("$.year", is("Year must not be lower than 1970")));
    }

    @Test
    public void shouldReturnErrorWhenConsoleIsEmpty() throws JsonProcessingException, Exception {
        Map<String,Object> body = new HashMap<>();
        body.put("title", "Mario");
        body.put("year", "1981");
        body.put("completionDate", "2020-03-20");
        body.put("personalNotes", "My notes");

        this.mockMvc
            .perform(post("/api/games")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(body))
                .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isBadRequest())
            .andExpect(content().contentType("application/json"))
            .andExpect(jsonPath("$.consoleId", is("Console must not be empty")));
    }

    @Test
    public void shouldReturnBadRequestWhenConsoleIsInvalid() throws JsonProcessingException, Exception {
        Map<String,Object> body = new HashMap<>();
        body.put("title", "Mario");
        body.put("year", "2017");
        body.put("consoleId", "124");
        body.put("completionDate", "2020-03-20");
        body.put("personalNotes", "My notes");

        when(gameService.addNewGame(any())).thenThrow(ConsoleNotFoundException.class);

        this.mockMvc
            .perform(post("/api/games")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(body))
                .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isBadRequest())
            .andExpect(content().contentType("application/json"));
    }

    @Test
    void shouldReturnAllGames() throws Exception {
        List<GameDto> allGames = new ArrayList<>();
        allGames.add(new GameDto(1, "Mario", (short) 2015, "Switch", LocalDate.of(2022, 3, 3), "My notes"));
        allGames.add(new GameDto(1, "Zelda", (short) 2017, "Switch", LocalDate.of(2022, 1, 1), "My other notes"));

        when(gameService.getAllGames()).thenReturn(allGames);

        this.mockMvc.perform(get("/api/games"))
            .andExpect(status().isOk())
            .andExpect(content().contentType("application/json"))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$", hasSize(2)));
    }
}
