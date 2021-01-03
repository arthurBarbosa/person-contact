package com.abcode.personcontact.controller;

import com.abcode.personcontact.entity.Person;
import com.abcode.personcontact.repository.PersonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/persons")
@RequiredArgsConstructor
public class PersonController {

    private final PersonRepository personRepository;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Person save(@RequestBody Person person) {
        return personRepository.save(person);
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
    public void favorite(@PathVariable Long id) {
        var person = personRepository.findById(id);
        person.ifPresent(obj -> {
            boolean favorite = obj.getFavorite() == Boolean.TRUE;
            obj.setFavorite(!favorite);
            personRepository.save(obj);
        });
    }
}
