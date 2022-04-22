package com.thiagov.gamescatalog.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thiagov.gamescatalog.dtos.ConsoleDto;
import com.thiagov.gamescatalog.services.ConsoleService;

@RestController
@RequestMapping(value = "/api/consoles")
public class ConsoleController {

    private ConsoleService consoleService;

    @Autowired
    public ConsoleController(ConsoleService consoleService) {
        this.consoleService = consoleService;
    }

    @GetMapping
    public List<ConsoleDto> getAllConsoles() {
        return consoleService.getAllConsoles();
    }
}
