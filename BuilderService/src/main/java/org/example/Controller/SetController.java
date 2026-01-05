package org.example.Controller;

import java.util.List;

import org.example.Service.SetService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sets")
public class SetController {
    private final SetService service;

    public SetController(SetService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public SetDTO getById(@PathVariable String id) {
        return service.getById(id);
    }

    @GetMapping("/search")
    public SetDTO getByName(@RequestParam String name) {
        return service.getByName(name);
    }

    /**
     * Get all sets endpoint with sync logic:
     * 1. Check DB for sets
     * 2. If empty, fetch from Pokemon TCG API
     * 3. Persist response to DB
     * Example: /sets
     */
    @GetMapping
    public List<SetDTO> getAllSets() {
        return service.getAllSets();
    }
}
