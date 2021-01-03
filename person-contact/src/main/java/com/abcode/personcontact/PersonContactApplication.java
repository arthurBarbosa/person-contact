package com.abcode.personcontact;

import com.abcode.personcontact.entity.Person;
import com.abcode.personcontact.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class PersonContactApplication {

    public static void main(String[] args) {
        SpringApplication.run(PersonContactApplication.class, args);
    }

}
