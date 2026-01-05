package org.example.Controller;

import java.util.List;

import org.example.Service.CardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cards")
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

    /**
     * Search endpoint that implements sync logic:
     * 1. Check DB for matches
     * 2. If no results, fetch from Pokemon TCG API
     * 3. Persist response to DB
     * Example: /cards/search?q=pikachu
     */
    @GetMapping("/search")
    public List<CardDTO> searchCards(@RequestParam("q") String query) {
        return service.searchCardsByName(query);
    }

    @GetMapping
    public List<CardDTO> getAllCards() {
        return service.getAllCards();
    }
}
