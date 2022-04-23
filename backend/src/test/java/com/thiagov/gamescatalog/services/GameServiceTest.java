package com.thiagov.gamescatalog.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.AdditionalAnswers.returnsFirstArg;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Sort;

import com.thiagov.gamescatalog.dtos.AddGameDto;
import com.thiagov.gamescatalog.dtos.GameDto;
import com.thiagov.gamescatalog.exceptions.ConsoleNotFoundException;
import com.thiagov.gamescatalog.models.Console;
import com.thiagov.gamescatalog.models.Game;
import com.thiagov.gamescatalog.repositories.ConsoleRepository;
import com.thiagov.gamescatalog.repositories.GameRepository;

@ExtendWith(MockitoExtension.class)
class GameServiceTest {

    @InjectMocks
    private GameService gameService;

    @Mock
    private GameRepository gameRepository;

    @Mock
    private ConsoleRepository consoleRepository;

    @Test
    public void shouldSaveAndReturnGameWhenDataIsOk() throws ConsoleNotFoundException {
        Console console = createConsole(1, "Xbox");
        AddGameDto addGameDto = createAddGameDto("Test Game", (short) 2010, console.getId(), LocalDate.now(), "Some notes");

        when(consoleRepository.findById(anyInt())).thenReturn(Optional.of(console));
        when(gameRepository.save(any())).then(returnsFirstArg());

        GameDto savedGame = gameService.addNewGame(addGameDto);
        assertNotNull(savedGame);
        assertEquals(addGameDto.getTitle(), savedGame.getTitle());
        assertEquals(addGameDto.getYear(), savedGame.getYear());
        assertEquals(addGameDto.getCompletionDate(), savedGame.getCompletionDate());
        assertEquals(addGameDto.getPersonalNotes(), savedGame.getPersonalNotes());
        assertEquals(console.getName(), savedGame.getConsoleName());
    }

    @Test
    public void shouldReturnConsoleNotFoundExceptionWhenConsoleDontExist() {
        when(consoleRepository.findById(anyInt())).thenReturn(Optional.empty());
        AddGameDto addGameDto = createAddGameDto("Test game", (short) 2010, 123, LocalDate.now(), "Some notes");

        ConsoleNotFoundException exception = assertThrows(ConsoleNotFoundException.class, () -> {
            gameService.addNewGame(addGameDto); 
        });

        String expectedMessage = "Console with id 123 not found.";
        String actualMessage = exception.getMessage();

        assertTrue(actualMessage.contains(expectedMessage));
    }

    @Test
    public void shouldGetAllGames() {
        Console xbox = createConsole(1, "Xbox");
        Console nintendoSwitch = createConsole(2, "Switch");
        List<Game> allGames = Arrays.asList(
                new Game("Zelda", (short) 2017, nintendoSwitch, LocalDate.of(2020, 1, 8), ""),
                new Game("Fallout", (short) 2015, xbox, LocalDate.of(2020, 10, 1), ""),
                new Game("Mario", (short) 2019,nintendoSwitch, LocalDate.of(2021, 6, 15), ""),
                new Game("Halo", (short) 2018, xbox, LocalDate.of(2022, 2, 2), ""));

        when(gameRepository.findAll(Sort.by(Sort.Direction.DESC, "completionDate").and(Sort.by(Sort.Direction.ASC, "title")))).thenReturn(allGames);

        List<GameDto> returnedGames = gameService.getAllGames();
        assertEquals(4, returnedGames.size());
    }

    @Test
    public void shouldCorrectlyConvertReturnedGames() {
        Console xbox = createConsole(1, "Xbox");
        Game mockGame = new Game("Halo", (short) 2018, xbox, LocalDate.of(2022, 2, 2), "");
        List<Game> allGames = Arrays.asList(mockGame);

        when(gameRepository.findAll(Sort.by(Sort.Direction.DESC, "completionDate").and(Sort.by(Sort.Direction.ASC, "title")))).thenReturn(allGames);

        List<GameDto> returnedGames = gameService.getAllGames();
        GameDto firstReturnedGame = returnedGames.get(0);
        assertEquals(mockGame.getTitle(), firstReturnedGame.getTitle());
        assertEquals(mockGame.getYear(), firstReturnedGame.getYear());
        assertEquals(mockGame.getCompletionDate(), firstReturnedGame.getCompletionDate());
        assertEquals(mockGame.getPersonalNotes(), firstReturnedGame.getPersonalNotes());
        assertEquals(xbox.getName(), firstReturnedGame.getConsoleName());
    }

    private Console createConsole(Integer id, String name) {
        Console console = new Console();
        console.setName(name);
        console.setId(id);
        return console;
    }

    private AddGameDto createAddGameDto(String title, Short year, Integer consoleId,
            LocalDate completionDate, String personalNotes) {
        AddGameDto addGameDto = new AddGameDto();
        addGameDto.setTitle(title);
        addGameDto.setYear(year);
        addGameDto.setConsoleId(consoleId);
        addGameDto.setCompletionDate(completionDate);
        addGameDto.setPersonalNotes(personalNotes);
        return addGameDto;
    }
}
