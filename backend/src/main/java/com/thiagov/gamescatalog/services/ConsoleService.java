package com.thiagov.gamescatalog.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thiagov.gamescatalog.dtos.ConsoleDto;
import com.thiagov.gamescatalog.models.Console;
import com.thiagov.gamescatalog.repositories.ConsoleRepository;

@Service
public class ConsoleService {

    private ConsoleRepository consoleRepository;

    @Autowired
    public ConsoleService(ConsoleRepository consoleRepository) {
        this.consoleRepository = consoleRepository;
    }

    public List<ConsoleDto> getAllConsoles() {
        List<Console> allConsoles = consoleRepository.findAll();
        return allConsoles.stream().map(ConsoleDto::new).collect(Collectors.toList());
    }
}
