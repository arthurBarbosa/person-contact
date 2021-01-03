package com.abcode.personcontact.repository;

import com.abcode.personcontact.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Long> {
}
