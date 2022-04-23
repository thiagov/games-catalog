package com.thiagov.gamescatalog.dtos;

import java.time.LocalDate;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonFormat;

public class AddGameDto {

    @NotNull(message = "Title must not be empty")
    @Size(min = 1, max = 100, message = "Title must be between 1 and 100 characters long") 
    private String title;

    @Min(value = 1970, message = "Year must not be lower than 1970")
    private Short year;

    @NotNull(message = "Console must not be empty")
    private Integer consoleId;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate completionDate;

    private String personalNotes;

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

    public Integer getConsoleId() {
        return consoleId;
    }

    public void setConsoleId(Integer consoleId) {
        this.consoleId = consoleId;
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
