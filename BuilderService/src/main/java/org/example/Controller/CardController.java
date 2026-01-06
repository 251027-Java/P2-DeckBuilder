package org.example.Controller;

import java.util.List;

import org.example.Service.CardService;
import org.example.Service.SetService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/card")
public class CardController {
    private final CardService service;

    public CardController(CardService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public CardDTO getById(@PathVariable String id) {
        return service.getById(id);
    }

    @GetMapping("/set")
    public List<CardDTO> getBySetId(@RequestParam String setId) {
        return service.getBySetId(setId);
    }

    @GetMapping
    public List<CardDTO> getAllCards() {
        return service.getAllCards();
    }
}
