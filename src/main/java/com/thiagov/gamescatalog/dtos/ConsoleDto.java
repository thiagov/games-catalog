package com.thiagov.gamescatalog.dtos;

import com.thiagov.gamescatalog.models.Console;

public class ConsoleDto {
    private Integer id;
    private String name;

    public ConsoleDto() { }

    public ConsoleDto(Console console) {
        this.id = console.getId();
        this.name = console.getName();
    }

    public ConsoleDto(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
