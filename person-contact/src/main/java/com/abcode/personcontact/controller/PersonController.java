package com.abcode.personcontact.controller;

import com.abcode.personcontact.entity.Person;
import com.abcode.personcontact.repository.PersonRepository;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Part;
import java.io.IOException;
import java.io.InputStream;
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
    public Page<Person> list(
            @RequestParam(value = "page", required = false, defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "10") Integer size) {
        Sort sort = Sort.by(Sort.Direction.ASC, "id");
        PageRequest pageRequest = PageRequest.of(page, size, sort);
        return personRepository.findAll(pageRequest);
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

    @PutMapping("{id}/image")
    public byte[] addImage(@PathVariable Long id,
                           @RequestParam("image") Part file) {
        var person = personRepository.findById(id);
        return person.map(personInDatabase -> {
            try {
                InputStream is = file.getInputStream();
                byte[] bytes = new byte[(int) file.getSize()];
                IOUtils.readFully(is, bytes);
                personInDatabase.setImage(bytes);
                personRepository.save(personInDatabase);
                is.close();
                return bytes;
            } catch (IOException e) {
                return null;
            }
        }).orElse(null);
    }
}
