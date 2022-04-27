package com.thiagov.gamescatalog.exceptions;

public class DuplicatedGameException extends Exception {

    private static final long serialVersionUID = -3749197019902863899L;

    public DuplicatedGameException(String errorMessage) {
        super(errorMessage);
    }
}
