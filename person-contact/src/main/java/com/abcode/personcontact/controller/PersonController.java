package com.abcode.personcontact.controller;

import com.abcode.personcontact.entity.Person;
import com.abcode.personcontact.repository.PersonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/persons")
@RequiredArgsConstructor
public class PersonController {

    private final PersonRepository personRepository;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void save(Person person) {
        personRepository.save(person);
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable Long id) {
        personRepository.deleteById(id);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Person> list() {
        return personRepository.findAll();
    }

    @PatchMapping("/{id}/favorite")
    public void favorite(@PathVariable Long id, @RequestBody Boolean favorite) {
        var person = personRepository.findById(id);
        person.ifPresent(obj -> {
            obj.setFavorite(favorite);
        });
    }
}