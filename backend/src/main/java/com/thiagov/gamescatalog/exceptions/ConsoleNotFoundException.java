package com.thiagov.gamescatalog.exceptions;

public class ConsoleNotFoundException extends Exception {

    private static final long serialVersionUID = 3112609969370966326L;

    public ConsoleNotFoundException(String errorMessage) {
        super(errorMessage);
    }
}
