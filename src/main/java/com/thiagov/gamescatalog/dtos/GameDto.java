package com.thiagov.gamescatalog.dtos;

import java.time.LocalDate;

import com.thiagov.gamescatalog.models.Game;

public class GameDto {
    private Integer id;
    private String title;
    private Short year;
    private String consoleName;
    private LocalDate completionDate;
    private String personalNotes;

    public GameDto() { }

    public GameDto(Game game) {
        this.id = game.getId();
        this.title = game.getTitle();
        this.year = game.getYear();
        this.consoleName = game.getConsole().getName();
        this.completionDate = game.getCompletionDate();
        this.personalNotes = game.getPersonalNotes();
    }

    public GameDto(Integer id, String title, Short year, String consoleName,
            LocalDate completionDate, String personalNotes) {
        this.id = id;
        this.title = title;
        this.year = year;
        this.consoleName = consoleName;
        this.completionDate = completionDate;
        this.personalNotes = personalNotes;
        
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Short getYear() {
        return year;
    }

    public void setYear(Short year) {
        this.year = year;
    }

    public String getConsoleName() {
        return consoleName;
    }

    public void setConsoleName(String consoleName) {
        this.consoleName = consoleName;
    }

    public LocalDate getCompletionDate() {
        return completionDate;
    }

    public void setCompletionDate(LocalDate completionDate) {
        this.completionDate = completionDate;
    }

    public String getPersonalNotes() {
        return personalNotes;
    }

    public void setPersonalNotes(String personalNotes) {
        this.personalNotes = personalNotes;
    }
}
