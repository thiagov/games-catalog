package com.thiagov.gamescatalog.controllers;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import com.thiagov.gamescatalog.dtos.ConsoleDto;
import com.thiagov.gamescatalog.services.ConsoleService;

@WebMvcTest({ConsoleController.class})
@ExtendWith(SpringExtension.class)
class ConsoleControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ConsoleService consoleService;

    @Test
    void shouldReturnAllConsoles() throws Exception {
        List<ConsoleDto> allConsoles = new ArrayList<>();
        allConsoles.add(new ConsoleDto(1, "Switch"));
        allConsoles.add(new ConsoleDto(2, "PS5"));
        allConsoles.add(new ConsoleDto(3, "PS4"));
        allConsoles.add(new ConsoleDto(4, "XBOX"));

        when(consoleService.getAllConsoles()).thenReturn(allConsoles);

        this.mockMvc.perform(get("/api/consoles"))
            .andExpect(status().isOk())
            .andExpect(content().contentType("application/json"))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$", hasSize(4)));
    }

}
