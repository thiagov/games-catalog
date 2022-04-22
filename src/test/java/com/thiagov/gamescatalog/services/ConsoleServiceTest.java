package com.thiagov.gamescatalog.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.thiagov.gamescatalog.dtos.ConsoleDto;
import com.thiagov.gamescatalog.models.Console;
import com.thiagov.gamescatalog.repositories.ConsoleRepository;

@ExtendWith(MockitoExtension.class)
class ConsoleServiceTest {

    @InjectMocks
    private ConsoleService consoleService;

    @Mock
    private ConsoleRepository consoleRepository;

    @Test
    public void shouldGetAllConsoles() {
        List<Console> allConsoles = Arrays.asList(
                createConsole(1, "Switch"),
                createConsole(2, "PS5"),
                createConsole(3, "Xbox"),
                createConsole(4, "Super Nintendo"),
                createConsole(5, "Gameboy"));

        when(consoleRepository.findAll()).thenReturn(allConsoles);

        List<ConsoleDto> returnedConsoles = consoleService.getAllConsoles();
        assertEquals(5, returnedConsoles.size());
    }

    @Test
    public void shouldCorrectlyConvertReturnedConsoles() {
        Console mockConsole = createConsole(10, "Sega Saturn");
        List<Console> allConsoles = Arrays.asList(mockConsole);

        when(consoleRepository.findAll()).thenReturn(allConsoles);

        List<ConsoleDto> returnedConsoles = consoleService.getAllConsoles();
        ConsoleDto firstReturnedConsole = returnedConsoles.get(0);
        assertEquals(mockConsole.getId(), firstReturnedConsole.getId());
        assertEquals(mockConsole.getName(), firstReturnedConsole.getName());

    }

    private Console createConsole(Integer id, String name) {
        Console console = new Console();
        console.setName(name);
        console.setId(id);
        return console;
    }
}
